import clsx from 'clsx';
import { Resizable } from 're-resizable';
import {
  ForwardedRef,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PreviewViewType } from '../../app/previews';
import { breakpoints } from '../../lib/breakpoints';
import { useBreakpointObserver } from '../../lib/use-breakpoint-observer';
import { PreviewSkeleton } from './preview.skeleton';

interface PreviewProps {
  pageUrl?: string;
  selectedView: PreviewViewType;
  selectedWidth: string | number;
  darkMode: boolean;
  onResizeStart: () => void;
  onResizeStop: () => void;
}

export const PreviewView = forwardRef(
  (
    {
      pageUrl,
      selectedView,
      selectedWidth,
      darkMode,
      onResizeStart,
      onResizeStop,
    }: PreviewProps,
    forwardedRef: ForwardedRef<Resizable>
  ) => {
    const isSmallScreen = useBreakpointObserver(breakpoints['sm']);
    const [loading, setLoading] = useState(true);
    const iframe = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
      // Reset to full width on x-small screens since resizable is disabled
      if (!isSmallScreen) {
        (forwardedRef as RefObject<Resizable>)?.current?.updateSize({
          width: '100%',
          height: '100%',
        });
      }
    }, [forwardedRef, isSmallScreen]);

    useEffect(() => {
      setLoading(true);

      // Clear the timeout if the iframe fails to load
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }, [pageUrl]);

    useEffect(() => {
      iframe.current?.contentDocument?.documentElement.classList.toggle(
        'dark',
        darkMode
      );
    }, [darkMode]);

    return (
      <Resizable
        ref={forwardedRef}
        className={clsx(
          selectedView === 'preview' ? 'flex' : 'hidden',
          'min-w-xs relative min-h-[640px] max-w-full flex-1 flex-col rounded-lg ring-1 ring-slate-900/10 transition-all duration-300'
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
            <div className="group absolute inset-y-0 left-full hidden cursor-ew-resize items-center px-2 sm:flex">
              <div
                className={clsx(
                  darkMode
                    ? 'bg-slate-500 group-hover:bg-slate-400 group-active:bg-slate-400'
                    : 'bg-slate-400 group-hover:bg-slate-500 group-active:bg-slate-500',
                  'h-8 w-1.5 rounded-full transition-colors'
                )}
              ></div>
            </div>
          ),
        }}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
      >
        <iframe
          ref={iframe}
          title="preview"
          src={pageUrl}
          className="w-full flex-1 rounded-lg"
          onLoad={() => {
            setTimeout(() => {
              iframe.current?.contentDocument?.documentElement.classList.toggle(
                'dark',
                darkMode
              );

              setLoading(false);
            }, 500);
          }}
        ></iframe>

        <PreviewSkeleton show={loading} darkMode={darkMode} />
      </Resizable>
    );
  }
);
