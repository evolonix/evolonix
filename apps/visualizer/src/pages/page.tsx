import clsx from 'clsx';
import { Params, useLoaderData } from 'react-router-dom';
import { Preview, getPreview } from '../data';

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
  if (!categoryId || !previewId) throw new Error('Missing params');

  const [preview] = await getPreview(previewId, categoryId);

  return { preview, darkMode };
}

export const Component = () => {
  const { preview, darkMode } = useLoaderData() as {
    preview: Preview;
    darkMode: boolean;
  };

  return preview.html ? (
    <div
      className={clsx('h-full', darkMode ? 'dark' : '')}
      dangerouslySetInnerHTML={{ __html: preview.html }}
    />
  ) : null;
};

Component.displayName = 'Page';
