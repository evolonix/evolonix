import { AnyNode, Cheerio, CheerioAPI, load } from 'cheerio';
import frontMatter from 'front-matter';
import htmlParser from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
import { Category, Preview } from '../data';

export interface PreviewAttributes {
  wrapper?: string;
  wrapperComponent?: string;
  title?: string;
  id?: string;
}

const applyAttributes = (
  $: CheerioAPI,
  element: Cheerio<AnyNode>,
  hideWrapper = false,
): void => {
  const html = $(element).html() || '';
  const { attributes, body } = frontMatter<PreviewAttributes>(html);
  $(element).html(body);

  const { wrapper = '', wrapperComponent, title = '', id = '' } = attributes;

  // Always replace title
  let replacedContent = $(element)
    .html()
    ?.replace(/<!-- TITLE -->/g, title ?? '');
  $(element).html(replacedContent || '');

  // Always replace id
  replacedContent = $(element)
    .html()
    ?.replace(/<!-- ID -->/g, id ?? '');
  $(element).html(replacedContent || '');

  if (hideWrapper || Object.keys(attributes).length === 0) return;

  if (wrapperComponent) {
    $(element).wrapInner(
      `<html-component name="${wrapperComponent}" title="${title}" id="${id}">${wrapper}</html-component>`,
    );
  } else {
    $(element).wrapInner(
      `<html-component title="${title}" id="${id}">${wrapper}</html-component>`,
    );
  }
};

export async function replaceHtmlComponents(html: string, hideWrapper = false) {
  if (!html) return '';

  const replaceComponentsRecursively = async (
    hideWrapper = false,
  ): Promise<void> => {
    for (const element of $('html-component')) {
      const hideComponent =
        hideWrapper && Boolean($(element).attr('hide-component'));
      if (hideComponent) {
        const innerContent = $(element).contents();
        $(element).replaceWith($(innerContent));

        continue;
      }

      let html = '<!-- CHILDREN -->';

      const componentName = $(element).attr('name');
      if (componentName) {
        const [name, ...folderParts] = componentName.split('/').reverse();
        if (folderParts.length > 1)
          throw new Error(
            'Invalid component name. Only one folder level is allowed.',
          );

        const folder = folderParts[0];

        html = await (folder
          ? import(`../../pages/components/${folder}/${name}.html?raw`)
          : import(`../../pages/components/${name}.html?raw`)
        )
          .then((m) => m.default as string)
          .catch((error) => {
            console.error(`Error loading component: ${componentName}`);
            console.error(error);

            throw error;
          });

        const componentTitle = $(element).attr('title');
        if (componentTitle) {
          html = html.replace(/<!-- TITLE -->/g, componentTitle ?? '');
        }

        const componentId = $(element).attr('id');
        if (componentId) {
          html = html.replace(/<!-- ID -->/g, componentId ?? '');
        }
      }

      const innerContent = $(element).html() || '';
      html = html.replace(/<!-- CHILDREN -->/g, innerContent ?? '');

      const $component = load(html);
      applyAttributes(
        $component,
        $component('body'),
        hideWrapper && Boolean($(element).attr('hide-wrapper')),
      );

      const componentClasses = $(element).attr('class');
      if (componentClasses) {
        $component('body').children().toggleClass(componentClasses, true);
      }

      $(element).replaceWith($component('body').contents());

      const onload = $(element).attr('onload');
      if (onload) {
        // Example: onload="selectSidebarNavItem('Catalog')"
        // Split onload value into function name and arguments
        const [functionName, ...args] = onload.split('(');
        const functionArgs = args
          .join('(')
          .split(')')[0]
          .split(/,(?=(?:(?:[^'|"]*'){2})*[^'|"]*$)/) // Split on comma unless the comma is inside of a string literal
          .map((arg) => arg.trim());

        // If arg starts with a single quote, remove single quotes, otherwise, if arg starts with a double quote, remove double quotes.
        // This allows us to pass string literals as arguments.
        for (let i = 0; i < functionArgs.length; i++) {
          const arg = functionArgs[i];
          if (arg.startsWith("'")) {
            functionArgs[i] = arg.slice(1, -1);
          } else if (arg.startsWith('"')) {
            functionArgs[i] = arg.slice(1, -1);
          }
        }

        setTimeout(() => {
          if (functionName in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any)[functionName](...functionArgs);
          }
        }, 100);
      }

      return replaceComponentsRecursively(hideWrapper);
    }
  };

  const $ = load(html);
  applyAttributes($, $('body'), hideWrapper);

  await replaceComponentsRecursively(hideWrapper);

  return $('body').html() ?? '';
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
        code: await replaceHtmlComponents(content, true).then((code) =>
          // Format the code with prettier to fix any formatting issues after parsing html components
          prettier.format(code, {
            parser: 'html',
            plugins: [htmlParser],
          }),
        ),
        html: await replaceHtmlComponents(content),
      } satisfies Preview;
    }

    return preview;
  };
