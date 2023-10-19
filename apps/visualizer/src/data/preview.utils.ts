import { load } from 'cheerio';

export async function replaceHtmlComponents(html: string) {
  if (!html) return '';

  const $ = load(html);

  const replaceComponentsRecursively = async () => {
    const componentPromises: Promise<void>[] = [];

    $('html-component').each((_, element) => {
      const componentName = $(element).attr('name');
      if (componentName) {
        const componentClasses = $(element).attr('class');
        const componentPath = `../pages/components/${componentName}.html?raw`;

        componentPromises.push(
          import(/* @vite-ignore */ componentPath)
            .then((m) => m.default as string)
            .then((componentContent) => {
              const innerContent = $(element).html();
              const replacedContent = componentContent.replace(
                '<!-- CHILDREN -->',
                innerContent ?? ''
              );
              const replacedElement = $(replacedContent);
              if (componentClasses) {
                replacedElement.toggleClass(componentClasses, true);
              }
              $(element).replaceWith(replacedElement);

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
