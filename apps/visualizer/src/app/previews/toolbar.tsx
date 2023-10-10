import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { PreviewViewType } from '.';

export const PreviewToolbar = ({
  templateUrl,
  selectedView,
  onViewSelect,
}: {
  templateUrl: string;
  selectedView: PreviewViewType;
  onViewSelect: (view: PreviewViewType) => void;
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [initialTop, setInitialTop] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const initial = toolbarRef.current?.offsetTop ?? null;

    setInitialTop(initial);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (initialTop === null) return;

      const form = toolbarRef.current;
      const top = form?.offsetTop ?? 0;

      setScrolled(top > initialTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialTop, scrolled]);

  return (
    <div
      ref={toolbarRef}
      className={clsx(
        'sticky top-14 z-20 flex items-center justify-end py-2 transition-shadow',
        scrolled
          ? '-mx-4 bg-gray-100 px-4 ring-1 ring-gray-200 sm:-mx-6 md:px-6 lg:-mx-8 lg:px-8'
          : ''
      )}
    >
      <div
        className="flex space-x-1 rounded-lg bg-gray-200 p-0.5"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className={clsx(
            selectedView === 'preview' ? 'bg-white shadow' : '',
            'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3'
          )}
          role="tab"
          aria-selected={selectedView === 'preview' ? 'true' : 'false'}
          tabIndex={selectedView === 'preview' ? 0 : -1}
          onClick={() => onViewSelect('preview')}
        >
          <EyeIcon
            className={clsx(
              selectedView === 'preview'
                ? 'stroke-indigo-500'
                : 'stroke-gray-600',
              'h-5 w-5 flex-none'
            )}
          />
          <span className="sr-only text-gray-900 lg:not-sr-only lg:ml-2">
            Preview
          </span>
        </button>
        <button
          type="button"
          className={clsx(
            selectedView === 'code' ? 'bg-white shadow' : '',
            'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3'
          )}
          role="tab"
          aria-selected={selectedView === 'code' ? 'true' : 'false'}
          tabIndex={selectedView === 'code' ? 0 : -1}
          onClick={() => onViewSelect('code')}
        >
          <CodeBracketIcon
            className={clsx(
              selectedView === 'code' ? 'stroke-indigo-500' : 'stroke-gray-600',
              'h-5 w-5 flex-none'
            )}
          />
          <span className="sr-only text-gray-600 lg:not-sr-only lg:ml-2">
            Code
          </span>
        </button>
      </div>
      <div className="ml-6 mr-6 h-5 w-px bg-gray-900/10"></div>
      <a
        href={templateUrl}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg
          className="-mt-1 -ml-0.5 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 19V14H7V17H10V19ZM5 10V5H10V7H7V10ZM14 19V17H17V14H19V19ZM17 10V7H14V5H19V10Z" />
        </svg>
        <span className="sr-only lg:not-sr-only">Full Screen</span>
      </a>
    </div>
  );
};
