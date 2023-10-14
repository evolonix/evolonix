import htmlParser from 'prettier/parser-html';
import prettier from 'prettier/standalone';
import { Resizable } from 're-resizable';
import { useCallback, useRef, useState } from 'react';
import { Params, useLoaderData } from 'react-router-dom';
import { Category, Preview } from '../../data/preview.model';
import { generateUrl } from '../../lib/category.utils';
import { PreviewBreakpoints } from './breakpoints';
import { CodeView } from './code';
import { PreviewGuide } from './guide';
import { PreviewView } from './preview';
import { PreviewToolbar } from './toolbar';

export type PreviewViewType = 'preview' | 'code';

export async function loader({ params }: { params: Params<string> }) {
  const { categoryId, previewId } = params;

  const code = await import(
    `../../pages/categories/${categoryId}/${previewId}.html?raw`
  )
    .then((m) => m.default as string)
    .then(async (code) =>
      // Format the code with prettier to fix any formatting issues after parsing components (Coming soon)
      prettier.format(code, {
        parser: 'html',
        plugins: [htmlParser],
      })
    );

  const categories = await import('../../pages/categories').then(
    (m) => m.categories
  );
  const category = categories.find((c) => c.id === categoryId) as Category;
  let preview = category?.previews.find((p) => p.id === previewId) as
    | Preview
    | undefined;
  preview = preview ? generateUrl(category)(preview) : undefined;

  const navigation = category.previews.map((preview) => ({
    name: preview.name,
    to: `/dashboard/${category.id}/${preview.id}`,
  }));

  return {
    code,
    category,
    preview,
    navigation,
  };
}

export const Component = () => {
  const { code, preview } = useLoaderData() as {
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
        pageUrl={preview.url}
        selectedView={selectedView}
        onViewSelect={setSelectedView}
        onCopyToClipboard={() => {
          navigator.clipboard.writeText(code);
        }}
      />

      <PreviewBreakpoints
        selectedView={selectedView}
        selectedWidth={selectedWidth}
        onBreakpointSelect={handleBreakpointSelect}
        onBreakpointEnter={handleBreakpointEnter}
        onBreakpointLeave={handleBreakpointLeave}
      />

      <div className="relative flex flex-1 flex-col rounded-lg ring-1 ring-slate-900/10 dark:ring-white/10">
        <PreviewView
          ref={resizable}
          pageUrl={preview.url}
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
