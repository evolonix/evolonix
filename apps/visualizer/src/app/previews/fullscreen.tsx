import { Suspense, useEffect } from 'react';
import {
  Await,
  Params,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

export async function loader({ params }: { params: Params<string> }) {
  const { id } = params;
  if (!id) {
    throw new Error('No name provided');
  }

  // Wait for an artifical delay for better UX
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const indexDoc = await import('../../../index.previews.html').then(
    (m) => m.default
  );
  const previewDoc = import(`../../../previews/${id}.html`).then(
    (m) => m.default
  );
  const doc = Promise.all([indexDoc, previewDoc, delay(500)]).then(
    ([index, preview]) => index.replace('<!-- PREVIEW -->', preview)
  );

  return defer({ doc, id });
}

export const Component = () => {
  const { doc, id } = useLoaderData() as {
    doc: Promise<string>;
    id: string;
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate back to /previews/:name when Escape key is pressed
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(`/previews/${id}`);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  });

  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-content-center p-4 text-3xl supports-[-webkit-touch-callout:none]:h-[-webkit-fill-available]">
          Loading...
        </div>
      }
    >
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
