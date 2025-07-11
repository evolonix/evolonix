'use client';

import * as Headless from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type React from 'react';
import { Button, Divider } from './catalyst';
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

export function Drawer({
  size = 'lg',
  className,
  children,
  onClose,
  ...props
}: {
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  onClose?: (value: boolean) => void;
} & Omit<Headless.DialogProps, 'as' | 'className' | 'onClose'>) {
  return (
    <Headless.Dialog
      {...props}
      className="relative z-10"
      onClose={
        onClose ??
        (() => {
          /* Ignore clicks outside the drawer */
        })
      }
    >
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-950/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Headless.DialogPanel
              transition
              className={clsx(
                className,
                sizes[size],
                'pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700',
              )}
            >
              <div className="flex h-full flex-col bg-white py-6 shadow-xl dark:bg-zinc-900 dark:shadow-black">
                {children}
              </div>
            </Headless.DialogPanel>
          </div>
        </div>
      </div>
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
            <Button plain onClick={() => onClose?.(false)}>
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </Button>
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
        'relative my-6 flex-1 overflow-y-auto px-4 sm:px-6',
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
