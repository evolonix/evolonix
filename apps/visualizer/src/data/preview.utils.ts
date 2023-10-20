import { AnyNode, Cheerio, load } from 'cheerio';
import frontMatter from 'front-matter';

export interface PreviewAttributes {
  wrapper?: string;
  wrapperComponent?: string;
}

export async function replaceHtmlComponents(
  html: string,
  processAttributes = true
) {
  if (!html) return '';

  const applyAttributes = (element: Cheerio<AnyNode>): string => {
    const html = $(element).html();
    const { attributes, body } = frontMatter<PreviewAttributes>(html ?? '');
    $(element).html(body);

    if (!processAttributes) return body;

    const { wrapper, wrapperComponent } = attributes;

    // First wrap the body in a wrapper component if specified
    if (wrapperComponent) {
      $(element).wrapInner(
        `<html-component name="${wrapperComponent}"></html-component>`
      );
    }

    // Then wrap the body in a wrapper element if specified
    if (wrapper) {
      $(element).wrapInner(wrapper);
    }

    return $(element).html() ?? '';
  };

  const $ = load(html);
  applyAttributes($('body'));

  const replaceComponentsRecursively = async () => {
    const componentPromises: Promise<void>[] = [];

    $('html-component').each((_, element) => {
      const componentName = $(element).attr('name');
      if (componentName) {
        const componentPath = `../pages/components/${componentName}.html?raw`;
        const componentClasses = $(element).attr('class');
        const innerContent = $(element).html();

        componentPromises.push(
          import(/* @vite-ignore */ componentPath)
            .then((m) => m.default as string)
            .then((html) => {
              html = html.replace('<!-- CHILDREN -->', innerContent ?? '');

              const $component = load(html);
              applyAttributes($component('body'));

              if (componentClasses) {
                $component('body')
                  .children()
                  .toggleClass(componentClasses, true);
              }

              $(element).replaceWith($component('body'));

              return replaceComponentsRecursively();
            })
            .catch((error) => {
              console.error(`Error loading component: ${componentName}`);
              console.error(error);
            })
        );
      }
    });

    await Promise.all(componentPromises);
  };

  await replaceComponentsRecursively();

  return $('body').html() || '';
}
