import { Suspense, useEffect } from 'react';
import {
  Await,
  Params,
  defer,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

export async function loader({ params }: { params: Params<string> }) {
  const { name } = params;
  if (!name) {
    throw new Error('No name provided');
  }

  // Wait for an artifical delay for better UX
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const index = await import('../../../index.previews.html').then(
    (m) => m.default
  );
  const preview = import(`../../previews/${name}.html`).then((m) => m.default);
  const doc = Promise.all([index, preview, delay(500)]).then(
    ([index, preview]) => index.replace('<!-- PREVIEW -->', preview)
  );

  return defer({ doc, name });
}

export const Component = () => {
  const { doc, name } = useLoaderData() as {
    doc: Promise<string>;
    name: string;
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate back to /previews/:name when Escape key is pressed
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(`/previews/${name}`);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  });

  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-content-center supports-[-webkit-touch-callout:none]:h-[-webkit-fill-available]">
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
