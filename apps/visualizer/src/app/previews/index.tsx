import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { useCallback, useRef, useState } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { getPreview } from '../../data';
import { Preview } from '../../data/preview.model';
import { PreviewBreakpoints } from './breakpoints';
import { CodeView } from './code';
import { PreviewGuide } from './guide';
import { PreviewView } from './preview';
import { PreviewToolbar } from './toolbar';

export type PreviewViewType = 'preview' | 'code';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId, previewId } = params;
  if (!categoryId || !previewId) throw new Error('Missing params');

  const [preview, navigation] = await getPreview(previewId, categoryId);

  return {
    preview,
    navigation,
  };
}

export const Component = () => {
  const { preview } = useLoaderData() as {
    preview: Preview;
  };
  const resizable = useRef<Resizable>(null);
  const [guide, setGuide] = useState<{ show: boolean; width: number }>({
    show: false,
    width: 0,
  });
  const [selectedWidth, setSelectedWidth] = useState<string | number>('100%');
  const [selectedView, setSelectedView] = useState<PreviewViewType>('preview');
  const [darkMode, setDarkMode] = useState(false);

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
        pageUrl={`${preview.url}?dark=${darkMode ? 'true' : 'false'}`}
        selectedView={selectedView}
        onViewSelect={setSelectedView}
        onCopyToClipboard={() => {
          if (preview?.code) navigator.clipboard.writeText(preview.code);
        }}
        onDarkModeToggle={(darkMode) => setDarkMode(darkMode)}
      />

      <PreviewBreakpoints
        selectedView={selectedView}
        selectedWidth={selectedWidth}
        onBreakpointSelect={handleBreakpointSelect}
        onBreakpointEnter={handleBreakpointEnter}
        onBreakpointLeave={handleBreakpointLeave}
      />

      <div
        className={clsx(
          darkMode ? 'bg-slate-800' : 'bg-slate-100',
          'relative flex flex-1 flex-col rounded-lg ring-1 ring-slate-900/10 transition-colors dark:ring-white/10'
        )}
      >
        <PreviewView
          ref={resizable}
          pageUrl={`${preview.url}?dark=${darkMode ? 'true' : 'false'}`}
          selectedView={selectedView}
          selectedWidth={selectedWidth}
          darkMode={darkMode}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        />

        <CodeView code={preview?.code} selectedView={selectedView} />

        <PreviewGuide
          show={guide.show}
          width={guide.width}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

Component.displayName = 'Preview';
