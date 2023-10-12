import clsx from 'clsx';
import { Resizable } from 're-resizable';
import { ForwardedRef, forwardRef } from 'react';
import { PreviewViewType } from '.';
import { breakpoints } from '../../lib/breakpoints';
import { useBreakpointObserver } from '../../lib/use-breakpoint-observer';

interface PreviewProps {
  templateUrl?: string;
  selectedView: PreviewViewType;
  selectedWidth: string | number;
  onResizeStart: () => void;
  onResizeStop: () => void;
}

export const PreviewView = forwardRef(
  (
    {
      templateUrl,
      selectedView,
      selectedWidth,
      onResizeStart,
      onResizeStop,
    }: PreviewProps,
    forwardedRef: ForwardedRef<Resizable>
  ) => {
    const isSmallScreen = useBreakpointObserver(breakpoints['sm']);

    return (
      <Resizable
        ref={forwardedRef}
        className={clsx(
          selectedView === 'preview' ? 'flex' : 'hidden',
          'relative min-w-[320px] max-w-full flex-1 flex-col rounded-lg bg-white ring-1 ring-gray-900/10 transition-all duration-300 dark:bg-gray-950 dark:ring-white/10'
        )}
        defaultSize={{
          width: selectedWidth,
          height: '100%',
        }}
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
              <div className="h-8 w-1.5 rounded-full bg-gray-400"></div>
            </div>
          ),
        }}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      >
        <iframe
          title="preview"
          src={templateUrl}
          className="w-full flex-1 rounded-lg"
        ></iframe>
      </Resizable>
    );
  }
);
