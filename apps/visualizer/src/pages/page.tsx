import { Params, useLoaderData } from 'react-router-dom';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId, previewId } = params;

  const html = await import(
    `./categories/${categoryId}/${previewId}.html?raw`
  ).then((m) => m.default as string);

  return { html };
}

export const Component = () => {
  const { html } = useLoaderData() as { html: string };

  return <div className="h-full" dangerouslySetInnerHTML={{ __html: html }} />;
};

Component.displayName = 'Page';
