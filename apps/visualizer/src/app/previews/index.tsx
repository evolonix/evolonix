import { Resizable } from 're-resizable';
import { Suspense, useCallback, useRef, useState } from 'react';
import { Params, defer, useLoaderData } from 'react-router-dom';
import { Preview } from '../../data/preview.model';
import { delay } from '../../lib/utils';
import { PreviewBreakpoints } from './breakpoints';
import { CodeView } from './code';
import { PreviewGuide } from './guide';
import { PreviewView } from './preview';
import { PreviewSkeleton } from './skeleton';
import { PreviewToolbar } from './toolbar';

export type PreviewViewType = 'preview' | 'code';

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const { id } = params;
  const url = new URL(request.url);
  const showSkeleton = url.searchParams.get('skeleton') === 'true';

  const shell = import('../../../index.previews.html?raw').then(
    (m) => m.default as string
  );
  const code = showSkeleton
    ? new Promise<string>(() => '')
    : import(`../../../previews/${id}.html?raw`).then(
        (m) => m.default as string
      );
  const doc = showSkeleton
    ? new Promise<string>(() => '')
    : Promise.all([shell, code, delay(0)]).then(([shell, code]) =>
        shell.replace('<!-- PREVIEW -->', code)
      );
  const previews = await import('../../../previews/previews').then(
    (m) => m.default as Preview[]
  );
  const preview = previews.find((p) => p.id === id);

  return defer({ doc, code, preview });
}

export const Component = () => {
  const { doc, code, preview } = useLoaderData() as {
    doc: Promise<string>;
    code: Promise<string>;
    preview: Preview;
  };
  const resizable = useRef<Resizable>(null);
  const [guide, setGuide] = useState<{ show: boolean; width: number }>({
    show: false,
    width: 0,
  });
  const [selectedWidth, setSelectedWidth] = useState<string | number>('100%');
  const [selectedView, setSelectedView] = useState<PreviewViewType>('preview');

  const handleBreakpointSelect = useCallback(
    (width: string | number) => {
      if (!resizable.current) {
        return;
      }

      if (width === selectedWidth) {
        width = '100%';
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
    setGuide({ show: true, width });
  };

  const handleBreakpointLeave = () => {
    setGuide({ show: false, width: 0 });
  };

  const handleResizeStart = () => {
    setSelectedWidth('100%');

    resizable.current?.resizable?.style.setProperty(
      'transition-property',
      'none'
    );
  };

  const handleResizeStop = () => {
    resizable.current?.resizable?.style.setProperty(
      'transition-property',
      'all'
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-4 text-4xl font-bold">{preview.name}</h1>

      <PreviewToolbar
        selectedView={selectedView}
        onViewSelect={setSelectedView}
      />

      <PreviewBreakpoints
        selectedView={selectedView}
        selectedWidth={selectedWidth}
        onBreakpointSelect={handleBreakpointSelect}
        onBreakpointEnter={handleBreakpointEnter}
        onBreakpointLeave={handleBreakpointLeave}
      />

      <div className="relative flex flex-1 flex-col rounded-lg ring-1 ring-gray-900/10">
        <Suspense fallback={<PreviewSkeleton />}>
          <PreviewView
            ref={resizable}
            doc={doc}
            selectedView={selectedView}
            selectedWidth={selectedWidth}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
          />

          <CodeView code={code} selectedView={selectedView} />
        </Suspense>

        <PreviewGuide show={guide.show} width={guide.width} />
      </div>
    </div>
  );
};

Component.displayName = 'Preview';
