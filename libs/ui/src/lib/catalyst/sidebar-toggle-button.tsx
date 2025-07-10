import * as Headless from '@headlessui/react';
import ChevronRightIcon from '@heroicons/react/16/solid/ChevronRightIcon';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { TouchTarget } from './button';

const styles = {
  base: [
    // Base
    'relative isolate inline-flex items-baseline justify-center rounded-full gap-x-2 border text-base/6 font-semibold',
    // Sizing
    'px-[calc(--spacing(1.75)-1px)] sm:px-[calc(--spacing(2)-1px)] py-[calc(--spacing(.75)-1px)] sm:py-[calc(--spacing(.5)-1px)] sm:text-sm/6',
    // Focus
    'focus:outline-hidden data-focus:outline data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
  solid: [
    // Optical border, implemented as the button background to avoid corner artifacts
    'border-transparent bg-(--btn-border)',
    // Dark mode: border is rendered on `after` so background is set to button background
    'dark:bg-(--btn-bg)',
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-(--btn-bg)',
    // Drop shadow, applied to the inset `before` layer so it blends with the border
    'before:shadow-sm',
    // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
    'dark:before:hidden',
    // Dark mode: Subtle white outline is applied using a border
    'dark:border-white/5',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:inset-0 after:-z-10 after:rounded-full',
    // Inner highlight shadow
    'after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]',
    // White overlay on hover
    'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
    // White overlay on focus
    'data-focus:after:bg-(--btn-hover-overlay)',
    // Dark mode: `after` layer expands to cover entire button
    'dark:after:-inset-px dark:after:rounded-full',
    // Disabled
    'data-disabled:before:shadow-none data-disabled:after:shadow-none',
  ],
  colors: {
    'dark/zinc': [
      'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
      'dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5',
      '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
      'data-focus:[--btn-icon:var(--color-zinc-300)]',
    ],
  },
};

type SidebarToggleButtonProps = {
  isExpanded: boolean;
  className?: string;
} & Omit<Headless.ButtonProps, 'as' | 'className' | 'children'>;

export const SidebarToggleButton = forwardRef(function Button(
  { isExpanded = false, className, ...props }: SidebarToggleButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = clsx(
    className,
    styles.base,
    styles.solid,
    styles.colors['dark/zinc'],
  );

  return (
    <Headless.Button
      {...props}
      className={clsx(classes, 'cursor-default')}
      ref={ref}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <TouchTarget>
        {/* {isExpanded ? (
          // Push pin icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-slot="icon"
            className="pointer-events-none"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
              <path
                fill="currentColor"
                d="M8.867 2a2 2 0 0 0-1.98 1.717l-.515 3.605a9 9 0 0 1-1.71 4.128l-1.318 1.758c-.443.59-.265 1.525.528 1.82.746.278 2.839.88 7.128.963V22a1 1 0 1 0 2 0v-6.01c4.29-.082 6.382-.684 7.128-.962.793-.295.97-1.23.528-1.82l-1.319-1.758a9 9 0 0 1-1.71-4.128l-.514-3.605A2 2 0 0 0 15.133 2zm0 2h6.266l.515 3.605c.261 1.83.98 3.565 2.09 5.045l.606.808C17.209 13.71 15.204 14 12 14s-5.21-.29-6.344-.542l.607-.808a11 11 0 0 0 2.09-5.045L8.866 4Z"
              />
            </g>
          </svg>
        ) : ( */}
        <ChevronRightIcon
          className={clsx(
            'pointer-events-none',
            isExpanded ? 'rotate-y-180' : '',
          )}
        />
        {/* )} */}
      </TouchTarget>
    </Headless.Button>
  );
});
