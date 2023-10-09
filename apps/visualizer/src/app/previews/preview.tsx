import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { Suspense, useCallback, useRef, useState } from 'react';
import { Await, Link, Params, defer, useLoaderData } from 'react-router-dom';
import { Preview } from '../../data/preview.model';
import { breakpoints } from '../../lib/breakpoints';
import { useBreakpointObserver } from '../../lib/use-breakpoint-observer';

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
  const previews = await import('../../../previews/previews.json').then(
    (m) => m.default
  );
  const preview = previews.find((p) => p.id === id);

  return defer({ doc, preview });
}

export const Component = () => {
  const { doc, preview } = useLoaderData() as {
    doc: Promise<string>;
    preview: Preview;
  };
  const resizable = useRef<Resizable>(null);
  const guide = useRef<HTMLDivElement>(null);
  const [selectedWidth, setSelectedWidth] = useState<string | number>('auto');
  const isSmallScreen = useBreakpointObserver(breakpoints['sm']);

  const handleBreakpointSelected = useCallback(
    (width: string | number) => {
      if (!resizable.current) {
        return;
      }

      if (width === selectedWidth) {
        width = 'auto';
      }

      const size = {
        width,
        height: resizable.current.state.height,
      };

      resizable.current.updateSize(size);
      setSelectedWidth(width);
    },
    [selectedWidth]
  );

  const handleBreakpointEnter = (width: number) => {
    if (guide.current) {
      guide.current.style.width = `${width}px`;
      guide.current.hidden = false;
    }
  };

  const handleBreakpointLeave = () => {
    if (guide.current) {
      guide.current.hidden = true;
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8 flex flex-col text-4xl font-bold">
        Welcome to Preview!
      </h1>

      {/* Toolbar */}
      <div className="mb-4 flex justify-end">
        <Link
          to={`/fullscreen/${preview.id}`}
          className="hover:underline"
          title="View fullscreen"
        >
          <span className="sr-only">Fullscreen</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5 19V14H7V17H10V19ZM5 10V5H10V7H7V10ZM14 19V17H17V14H19V19ZM17 10V7H14V5H19V10Z" />
          </svg>
        </Link>
      </div>

      {/* Breakpoints */}
      <div className="relative hidden h-8 max-w-full overflow-hidden sm:block">
        {Object.entries(breakpoints).map(([key, width]) => (
          <div
            key={key}
            className="absolute top-0 -mr-px flex h-8 items-center border-r-2 border-dashed border-red-500"
            style={{
              left: `${width + 1}px`,
              transform: 'translateX(-100%)',
            }}
          >
            <button
              className={clsx(
                width === selectedWidth ? 'text-blue-500' : '',
                'group -mr-2 inline-flex items-center gap-1 hover:text-blue-500'
              )}
              onClick={() => handleBreakpointSelected(width)}
              onPointerEnter={() => handleBreakpointEnter(width)}
              onPointerLeave={() => handleBreakpointLeave()}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs leading-none text-neutral-400">
                  {width}px
                </span>
                <span className="text-sm leading-none">{key}</span>
              </div>
              <svg
                className={clsx(
                  width === selectedWidth ? 'fill-current' : 'fill-none',
                  'h-3.5 w-3.5 group-hover:fill-current'
                )}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="flex flex-1 flex-col rounded-lg border border-neutral-200">
        <Resizable
          ref={resizable}
          className="relative flex min-w-[320px] max-w-full flex-1 flex-col rounded-lg bg-white ring-1 ring-neutral-900/10"
          enable={{
            right: isSmallScreen,
            left: false,
            top: false,
            bottom: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            right: {
              cursor: 'ew-resize',
            },
          }}
          handleComponent={{
            right: (
              <div className="absolute inset-y-0 left-full hidden cursor-ew-resize items-center px-2 sm:flex">
                <div className="h-8 w-1.5 rounded-full bg-neutral-400"></div>
              </div>
            ),
          }}
        >
          <Suspense
            fallback={
              <div className="grid flex-1 place-content-center p-4 text-3xl">
                Loading...
              </div>
            }
          >
            <Await resolve={doc}>
              {(resolvedDoc: string) => (
                <>
                  <iframe
                    title="preview"
                    srcDoc={resolvedDoc}
                    className="w-full flex-1"
                  ></iframe>

                  {/* Guide */}
                  <div
                    ref={guide}
                    className="absolute top-1 bottom-0 border-r-2 border-dashed border-red-500"
                    hidden
                  ></div>
                </>
              )}
            </Await>
          </Suspense>
        </Resizable>
      </div>
    </div>
  );
};

Component.displayName = 'Preview';
