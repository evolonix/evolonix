import { Suspense, useEffect } from 'react';
import {
  Await,
  Params,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { FullscreenSkeleton } from './skeleton';

export async function loader({ params }: { params: Params<string> }) {
  const { id } = params;
  if (!id) {
    throw new Error('No name provided');
  }

  const shell = await import('../../../index.previews.html?raw').then(
    (m) => m.default
  );
  const code = await import(`../../../previews/${id}.html?raw`).then(
    (m) => m.default
  );
  const doc = Promise.all([shell, code]).then(([shell, code]) =>
    shell.replace('<!-- PREVIEW -->', code)
  );

  return defer({ doc });
}

export const Component = () => {
  const { doc } = useLoaderData() as {
    doc: Promise<string>;
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate back to /previews/:id when Escape key is pressed
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('..', { relative: 'path' });
      }
    };

    window.addEventListener('keyup', handleEscape);

    return () => window.removeEventListener('keyup', handleEscape);
  }, [navigate]);

  return (
    <Suspense fallback={<FullscreenSkeleton />}>
      <Await resolve={doc}>
        {(doc) => (
          <iframe
            title="preview"
            srcDoc={doc}
            className="min-h-screen w-full supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]"
          ></iframe>
        )}
      </Await>
    </Suspense>
  );
};

Component.displayName = 'Fullscreen';
