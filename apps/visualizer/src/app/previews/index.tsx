import { Resizable } from 're-resizable';
import { useCallback, useRef, useState } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { Preview } from '../../data/preview.model';
import { PreviewBreakpoints } from './breakpoints';
import { CodeView } from './code';
import { PreviewGuide } from './guide';
import { PreviewView } from './preview';
import { PreviewToolbar } from './toolbar';

export type PreviewViewType = 'preview' | 'code';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId, previewId } = params;

  const templateUrl = `templates/?categoryId=${categoryId}&previewId=${previewId}`;
  const code = await import(
    `../../../templates/${categoryId}/${previewId}.html?raw`
  ).then((m) => m.default as string);

  const categories = await import('../../../templates/categories').then(
    (m) => m.categories
  );
  const preview = categories
    .find((c) => c.id === categoryId)
    ?.previews.find((p) => p.id === previewId);

  return { templateUrl, code, preview };
}

export const Component = () => {
  const { templateUrl, code, preview } = useLoaderData() as {
    templateUrl: string;
    code: string;
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
        templateUrl={templateUrl}
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
        <PreviewView
          ref={resizable}
          templateUrl={templateUrl}
          selectedView={selectedView}
          selectedWidth={selectedWidth}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        />

        <CodeView code={code} selectedView={selectedView} />

        <PreviewGuide show={guide.show} width={guide.width} />
      </div>
    </div>
  );
};

Component.displayName = 'Preview';
