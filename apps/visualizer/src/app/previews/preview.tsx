import { Suspense } from 'react';
import { Await, Link, Params, defer, useLoaderData } from 'react-router-dom';

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

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8 flex flex-col text-4xl font-bold">
        Welcome to Preview!
      </h1>

      <div className="mb-4">
        <Link to={`/fullscreen/${name}`} className="hover:underline">
          Fullscreen
        </Link>
      </div>

      <div className="flex flex-1 flex-col rounded-lg">
        <Suspense
          fallback={
            <div className="grid flex-1 place-content-center bg-white ring-1 ring-neutral-900/10">
              Loading...
            </div>
          }
        >
          <Await resolve={doc}>
            {(doc) => (
              <div className="relative flex flex-1 flex-col">
                <iframe
                  title="preview"
                  srcDoc={doc}
                  className="w-full min-w-[320px] max-w-full flex-1 overflow-hidden rounded-lg bg-white ring-1 ring-neutral-900/10"
                ></iframe>
                <div className="absolute inset-y-0 left-full hidden cursor-ew-resize items-center px-2 sm:flex">
                  <div className="h-8 w-1.5 rounded-full bg-neutral-400"></div>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

Component.displayName = 'Preview';
