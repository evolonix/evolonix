import clsx from 'clsx';
import { useEffect } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { Preview, getPreview } from '../../data';

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

  useEffect(() => {
    // Don't do anything if we're not in an iframe
    if (window.top === window.self) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle the menu when ⌘ K or Ctrl K is pressed
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Dispatch the event on the parent window
        window.parent.document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'k', metaKey: true }),
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return preview.html ? (
    <div
      className={clsx('h-full', darkMode ? 'dark' : '')}
      dangerouslySetInnerHTML={{ __html: preview.html }}
    />
  ) : null;
};

Component.displayName = 'Page';
