import { Transition } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import {
  ClipboardIcon,
  CodeBracketIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { PreviewViewType } from '../../app/previews';

export const PreviewToolbar = ({
  pageUrl,
  selectedView,
  darkMode,
  onViewSelect,
  onCopyToClipboard,
  onDarkModeToggle,
}: {
  pageUrl?: string;
  selectedView: PreviewViewType;
  darkMode: boolean;
  onViewSelect: (view: PreviewViewType) => void;
  onCopyToClipboard: () => void;
  onDarkModeToggle: (darkMode: boolean) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setCopied(true);
    onCopyToClipboard();

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleDarkModeToggle = () => {
    const dark = !darkMode;

    onDarkModeToggle(dark);
  };

  return (
    <div className="z-10 mb-4 flex items-center justify-end py-2">
      <div
        className="flex space-x-1 rounded-lg bg-slate-200 p-0.5 dark:bg-slate-900"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          className={clsx(
            selectedView === 'preview' ? 'bg-white shadow' : '',
            'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3',
          )}
          role="tab"
          aria-selected={selectedView === 'preview' ? 'true' : 'false'}
          tabIndex={selectedView === 'preview' ? 0 : -1}
          onClick={() => onViewSelect('preview')}
        >
          <EyeIcon
            className={clsx(
              selectedView === 'preview'
                ? 'stroke-sky-500'
                : 'stroke-slate-600 dark:stroke-slate-400',
              'h-5 w-5 flex-none',
            )}
          />
          <span
            className={clsx(
              selectedView === 'preview' ? 'text-slate-600' : '',
              'sr-only lg:not-sr-only lg:ml-2',
            )}
          >
            Preview
          </span>
        </button>
        <button
          type="button"
          className={clsx(
            selectedView === 'code' ? 'bg-white shadow' : '',
            'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3',
          )}
          role="tab"
          aria-selected={selectedView === 'code' ? 'true' : 'false'}
          tabIndex={selectedView === 'code' ? 0 : -1}
          onClick={() => onViewSelect('code')}
        >
          <CodeBracketIcon
            className={clsx(
              selectedView === 'code'
                ? 'stroke-sky-500'
                : 'stroke-slate-600 dark:stroke-slate-400',
              'h-5 w-5 flex-none',
            )}
          />
          <span
            className={clsx(
              selectedView === 'code' ? 'text-slate-600' : '',
              'sr-only lg:not-sr-only lg:ml-2',
            )}
          >
            HTML
          </span>
        </button>
      </div>

      <div className="ml-6 mr-6 h-5 w-px bg-slate-900/10 dark:bg-slate-50/20"></div>

      {/* Copy to Clipboard */}
      <button
        type="button"
        className="group relative inline-flex items-center rounded-md bg-sky-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:shadow-black lg:px-2.5"
        onClick={handleCopyToClipboard}
      >
        <ClipboardIcon className="h-5 w-5" />
        <span className="sr-only lg:not-sr-only lg:ml-1.5">Copy HTML</span>

        <Transition
          as={Fragment}
          show={copied}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute bottom-full left-1/2 -ml-2 mb-2.5 flex -translate-x-1/2 justify-center">
            <div className="rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold uppercase leading-4 tracking-wide text-white drop-shadow-md filter dark:bg-slate-50 dark:text-slate-950">
              <svg
                aria-hidden="true"
                width="16"
                height="6"
                viewBox="0 0 16 6"
                className="absolute left-1/2 top-full -mt-px"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                  className="fill-slate-900 dark:fill-slate-50"
                ></path>
              </svg>
              Copied!
            </div>
          </div>
        </Transition>
      </button>

      {/* Dark Mode */}
      <button
        type="button"
        className="group relative ml-2 inline-flex items-center rounded-md bg-sky-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:shadow-black lg:px-2.5"
        onClick={handleDarkModeToggle}
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
        <span className="sr-only lg:not-sr-only lg:ml-1.5">
          {darkMode ? 'Light' : 'Dark'} Mode
        </span>
      </button>

      <div className="ml-6 mr-6 h-5 w-px bg-slate-900/10 dark:bg-slate-50/20"></div>

      {/* Full Screen */}
      <a
        href={pageUrl}
        className="inline-flex items-center rounded-md bg-sky-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:shadow-black lg:gap-x-1.5 lg:px-2.5"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 20.25V14.3571H6.10714V17.8929H9.64286V20.25H3.75ZM3.75 9.64286V3.75H9.64286V6.10714H6.10714V9.64286H3.75ZM14.3571 20.25V17.8929H17.8929V14.3571H20.25V20.25H14.3571ZM17.8929 9.64286V6.10714H14.3571V3.75H20.25V9.64286H17.8929Z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only lg:not-sr-only">Full Screen</span>
      </a>
    </div>
  );
};
