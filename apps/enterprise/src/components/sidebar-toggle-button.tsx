import * as Headless from '@headlessui/react';
import ChevronRightIcon from '@heroicons/react/16/solid/ChevronRightIcon';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { TouchTarget } from './catalyst';

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
    ],
  },
};

type SidebarToggleButtonProps = {
  isExpanded: boolean;
  className?: string;
} & Omit<Headless.ButtonProps, 'as' | 'className' | 'children'>;

export const SidebarToggleButton = forwardRef(function Button(
  { isExpanded = false, className, ...props }: SidebarToggleButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = clsx(
    className,
    styles.base,
    styles.solid,
    styles.colors['dark/zinc']
  );

  return (
    <Headless.Button
      {...props}
      className={clsx(classes, 'cursor-default')}
      ref={ref}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <TouchTarget>
        <ChevronRightIcon
          className={clsx(
            'pointer-events-none h-5 w-5',
            isExpanded ? 'rotate-y-180' : ''
          )}
        />
      </TouchTarget>
    </Headless.Button>
  );
});
