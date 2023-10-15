import clsx from 'clsx';
import { Params, useLoaderData } from 'react-router-dom';

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const { categoryId, previewId } = params;
  const url = new URL(request.url);
  const darkMode = url.searchParams.get('dark') === 'true';

  const html = await import(
    `./categories/${categoryId}/${previewId}.html?raw`
  ).then((m) => m.default as string);

  return { html, darkMode };
}

export const Component = () => {
  const { html, darkMode } = useLoaderData() as {
    html: string;
    darkMode: boolean;
  };

  return (
    <div
      className={clsx('h-full', darkMode ? 'dark' : '')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

Component.displayName = 'Page';
