import clsx from 'clsx';
import { PreviewViewType } from '.';
import { breakpoints } from '../../lib/breakpoints';

export const PreviewBreakpoints = ({
  selectedView,
  selectedWidth,
  onBreakpointSelect,
  onBreakpointEnter,
  onBreakpointLeave,
}: {
  selectedView: PreviewViewType;
  selectedWidth: string | number;
  onBreakpointSelect: (width: string | number) => void;
  onBreakpointEnter: (width: number) => void;
  onBreakpointLeave: () => void;
}) => {
  return (
    <div
      className={clsx(
        selectedView === 'code' ? 'sm:invisible sm:block' : 'sm:block',
        'relative hidden h-8 max-w-full overflow-hidden'
      )}
    >
      {Object.entries(breakpoints).map(([key, width]) => (
        <div
          key={key}
          className="absolute top-0 -mr-px flex h-8 items-center border-r-2 border-dashed border-red-500 dark:border-red-400"
          style={{
            left: `${width + 1}px`,
            transform: 'translateX(-100%)',
          }}
        >
          <button
            className={clsx(
              width === selectedWidth ? 'text-indigo-500' : '',
              'group -mr-2 inline-flex items-center gap-1 hover:text-indigo-500'
            )}
            onClick={() => onBreakpointSelect(width)}
            onPointerEnter={() => onBreakpointEnter(width)}
            onPointerLeave={() => onBreakpointLeave()}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs leading-none text-gray-400">
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
  );
};
