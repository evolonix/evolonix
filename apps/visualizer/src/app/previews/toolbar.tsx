import { Transition } from '@headlessui/react';
import {
  ClipboardIcon,
  CodeBracketIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { PreviewViewType } from '.';

export const PreviewToolbar = ({
  templateUrl,
  selectedView,
  onViewSelect,
  onCopyToClipboard,
}: {
  templateUrl?: string;
  selectedView: PreviewViewType;
  onViewSelect: (view: PreviewViewType) => void;
  onCopyToClipboard: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setCopied(true);
    onCopyToClipboard();

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="sticky top-0 z-30 my-px flex items-center justify-end py-2">
      <div
        className="flex space-x-1 rounded-lg bg-gray-200 p-0.5 dark:bg-gray-900"
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
                : 'stroke-gray-600 dark:stroke-gray-400',
              'h-5 w-5 flex-none'
            )}
          />
          <span
            className={clsx(
              selectedView === 'preview' ? 'text-gray-600' : '',
              'sr-only lg:not-sr-only lg:ml-2'
            )}
          >
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
              selectedView === 'code'
                ? 'stroke-indigo-500'
                : 'stroke-gray-600 dark:stroke-gray-400',
              'h-5 w-5 flex-none'
            )}
          />
          <span
            className={clsx(
              selectedView === 'code' ? 'text-gray-600' : '',
              'sr-only lg:not-sr-only lg:ml-2'
            )}
          >
            Code
          </span>
        </button>
      </div>

      <div className="ml-6 mr-6 h-5 w-px bg-gray-900/10 dark:bg-white/10"></div>

      {/* Full Screen */}
      <a
        href={templateUrl}
        className="inline-flex items-center rounded-md bg-indigo-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:shadow-black lg:gap-x-1.5 lg:px-2.5"
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

      {/* Copy to Clipboard */}
      <button
        type="button"
        className="group relative ml-2 inline-flex items-center rounded-md p-1.5 text-sm font-semibold text-gray-500 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:shadow-black dark:hover:text-indigo-400 dark:focus-visible:outline-indigo-500"
        onClick={handleCopyToClipboard}
      >
        <span className="sr-only">Copy code to clipboard</span>
        <ClipboardIcon className="h-5 w-5 text-current transition-transform group-hover:rotate-[-4deg]" />
        <Transition
          show={copied}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute -left-8 top-full ml-0.5 mt-2.5 flex justify-center">
            <div className="rounded-md bg-gray-900 px-3 py-1 text-xs font-semibold uppercase leading-4 tracking-wide text-white drop-shadow-md filter dark:bg-gray-50 dark:text-gray-950">
              <svg
                aria-hidden="true"
                width="16"
                height="6"
                viewBox="0 0 16 6"
                className="absolute bottom-full left-1/2 -mb-px rotate-180"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                  className="fill-gray-900 dark:fill-gray-50"
                ></path>
              </svg>
              Copied!
            </div>
          </div>
        </Transition>
      </button>
    </div>
  );
};
