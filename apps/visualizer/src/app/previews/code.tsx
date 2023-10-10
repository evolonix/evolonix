import clsx from 'clsx';
import Prism from 'prismjs';
import { Await } from 'react-router-dom';
import { PreviewViewType } from '.';

export const CodeView = ({
  code,
  selectedView,
}: {
  code: Promise<string>;
  selectedView: PreviewViewType;
}) => {
  return (
    <div
      className={clsx(
        selectedView === 'code' ? 'flex' : 'hidden',
        'flex-1 overflow-hidden rounded-lg bg-gray-800 text-white'
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          <Await resolve={code}>
            {(resolvedPreviewHtml: string) => (
              <pre className="flex overflow-auto text-sm leading-[1.5714285714]">
                <code
                  className="p-4"
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      resolvedPreviewHtml,
                      Prism.languages.html,
                      'html'
                    ),
                  }}
                ></code>
              </pre>
            )}
          </Await>
        </div>
      </div>
    </div>
  );
};
