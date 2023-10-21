import { AnyNode, Cheerio, load } from 'cheerio';
import frontMatter from 'front-matter';
import htmlParser from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { Category, Preview } from '../data';

export interface PreviewAttributes {
  wrapper?: string;
  wrapperComponent?: string;
}

export async function replaceHtmlComponents(
  html: string,
  processAttributes = true
) {
  if (!html) return '';

  const applyAttributes = (
    element: Cheerio<AnyNode>,
    processAttributes = true
  ): string => {
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
  applyAttributes($('body'), processAttributes);

  const replaceComponentsRecursively = async () => {
    for (const element of $('html-component')) {
      const componentName = $(element).attr('name');
      if (componentName) {
        const [name, ...folderParts] = componentName.split('/').reverse();
        if (folderParts.length > 1)
          throw new Error(
            'Invalid component name. Only one folder level is allowed.'
          );

        const folder = folderParts[0];
        const componentClasses = $(element).attr('class');
        const innerContent = $(element).html();

        await (folder
          ? import(`../../pages/components/${folder}/${name}.html?raw`)
          : import(`../../pages/components/${name}.html?raw`)
        )
          .then((m) => m.default as string)
          .then((html) => {
            html = html.replace('<!-- CHILDREN -->', innerContent ?? '');

            const $component = load(html);
            applyAttributes($component('body'));

            if (componentClasses) {
              $component('body').children().toggleClass(componentClasses, true);
            }

            $(element).replaceWith($component('body').contents());

            return replaceComponentsRecursively();
          })
          .catch((error) => {
            console.error(`Error loading component: ${componentName}`);
            console.error(error);
          });
      }
    }
  };

  await replaceComponentsRecursively();

  return $('body').html() || '';
}

export const hydratePreview =
  (category: Category, full = true) =>
  async (preview: Preview) => {
    const loadPlaceholderImage = async () =>
      await import('../assets/placeholder.png').then((m) => m.default);

    const content = await import(
      `../../pages/categories/${category.id}/${preview.id}.html?raw`
    ).then((m) => m.default);

    preview = {
      ...preview,
      category,
      image: await import(
        `../../pages/categories/${category.id}/${preview.id}.png`
      )
        .then((m) => m.default)
        .catch(loadPlaceholderImage),
    } satisfies Preview;

    if (full) {
      preview = {
        ...preview,
        url: `/pages/${category.id}/${preview.id}`,
        code: await replaceHtmlComponents(content, false).then((code) =>
          // Format the code with prettier to fix any formatting issues after parsing html components
          prettier.format(code, {
            parser: 'html',
            plugins: [htmlParser],
          })
        ),
        html: await replaceHtmlComponents(content),
      } satisfies Preview;
    }

    return preview;
  };
