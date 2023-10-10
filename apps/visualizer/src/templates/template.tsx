import { useLoaderData } from 'react-router-dom';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');
  const previewId = url.searchParams.get('previewId');

  if (!categoryId || !previewId) {
    throw new Error('Missing categoryId or previewId');
  }

  const html = await import(
    `../../templates/${categoryId}/${previewId}.html?raw`
  ).then((m) => m.default as string);

  return { html };
}

export const Template = () => {
  const { html } = useLoaderData() as { html: string };

  return <div className="h-full" dangerouslySetInnerHTML={{ __html: html }} />;
};
