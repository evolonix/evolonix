'use client';

import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import type React from 'react';
import { Divider, NavbarItem } from './catalyst';
import { Text } from './catalyst/text';

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  full: 'sm:max-w-full',
};

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

export function Drawer({
  open,
  close,
  size = 'lg',
  children,
}: React.PropsWithChildren<{
  open: boolean;
  close?: (value: boolean) => void;
  size?: keyof typeof sizes;
}>) {
  return (
    <Headless.Dialog open={open} onClose={(v) => close?.(v)}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/70 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <Headless.DialogPanel
        transition
        className={clsx(
          sizes[size],
          'fixed inset-y-0 right-0 w-full p-2 transition duration-300 ease-in-out data-closed:translate-x-full',
        )}
      >
        <div className="flex h-full flex-col rounded-lg bg-white p-6 py-6 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          {children}
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  );
}

export function DrawerHeader({
  title,
  description,
  className,
  onClose,
  ...props
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  onClose?: (value: boolean) => void;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>) {
  return (
    <>
      <div {...props} className={clsx(className, 'px-4 sm:px-6')}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Headless.DialogTitle className="text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white">
              {title}
            </Headless.DialogTitle>
            {description ? (
              <Headless.Description as={Text} className="mt-2 text-pretty">
                {description}
              </Headless.Description>
            ) : null}
          </div>
          <div className="ml-3 flex h-7 items-center">
            <Headless.CloseButton
              as={NavbarItem}
              aria-label="Close navigation"
              onClick={() => onClose?.(false)}
            >
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
        </div>
      </div>
      <Divider className="mt-6" />
    </>
  );
}

export function DrawerBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'relative flex-1 overflow-y-auto px-4 py-6 sm:px-6',
      )}
    ></div>
  );
}

export function DrawerActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <>
      <Divider />
      <div
        {...props}
        className={clsx(
          className,
          'mt-6 flex flex-col items-center justify-start gap-3 px-4 *:w-full sm:flex-row-reverse sm:px-6 sm:*:w-auto',
        )}
      />
    </>
  );
}
