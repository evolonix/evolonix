import clsx from 'clsx';
import React from 'react';

const validate = (children: React.ReactNode) => {
  const validateElement = (element: React.ReactElement) => {
    if (element.type !== GridLayoutItem) {
      throw new Error('Invalid component type provided for GridLayout. Expected GridLayoutItem or a Fragment of GridLayoutItem elements.');
    }
  };

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.Children.forEach((child.props as any).children, validateElement);
      } else validateElement(child);
    }
  });
};

export interface GridLayoutProps {
  fullWidth?: boolean;
  disableTopPadding?: boolean;
}

export const GridLayout = ({
  fullWidth = false,
  disableTopPadding = false,
  ...props
}: GridLayoutProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>) => {
  // Validate that all children are of type GridLayoutItem
  validate(props.children);

  return (
    <div
      className={clsx(
        'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12',
        'gap-4 xl:gap-6',
        'xxl:px-12 px-4 xl:px-6',
        disableTopPadding ? '' : 'pt-4 xl:pt-6',
        fullWidth ? '' : '2xl:mx-auto',
        'w-full 2xl:max-w-[var(--breakpoint-2xl)]'
      )}
      {...props}
    />
  );
};

export interface GridLayoutItemProps {
  xs?: 1 | 2 | 3 | 4;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xxl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const GridLayoutItem = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  ...props
}: GridLayoutItemProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>) => {
  // Specified breakpoint values win over full width
  xxl ??= xl ?? lg ?? md ?? sm ?? xs ?? 12;
  xl ??= lg ?? md ?? sm ?? xs ?? 12;
  lg ??= md ?? sm ?? xs ?? 12;
  md ??= sm ?? xs ?? 8;
  sm ??= xs ?? 8;
  xs ??= 4;

  return (
    <div
      style={
        {
          '--grid-col-span-xs': xs,
          '--grid-col-span-sm': sm,
          '--grid-col-span-md': md,
          '--grid-col-span-lg': lg,
          '--grid-col-span-xl': xl,
          '--grid-col-span-xxl': xxl,
        } as React.CSSProperties
      }
      className={clsx(
        'col-span-[var(--grid-col-span-xs)]',
        'sm:col-span-[var(--grid-col-span-sm)]',
        'md:col-span-[var(--grid-col-span-md)]',
        'lg:col-span-[var(--grid-col-span-lg)]',
        'xl:col-span-[var(--grid-col-span-xl)]',
        'xxl:col-span-[var(--grid-col-span-xxl)]'
      )}
      {...props}
    />
  );
};
