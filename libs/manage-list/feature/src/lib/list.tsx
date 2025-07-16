import { Divider } from '@evolonix/ui';
import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { NavLink, To } from 'react-router';

interface ListProps {
  children: React.ReactNode;
}

export const List = ({ children }: ListProps) => {
  return children;
};

interface ListHeaderProps {
  children: React.ReactNode;
}

export const ListHeader = ({ children }: ListHeaderProps) => {
  return (
    <>
      <div className="px-4 pt-4 md:px-0 md:pt-0">{children}</div>
      <Divider />
    </>
  );
};

interface ListBodyProps {
  children: React.ReactNode;
}

export const ListBody = ({ children }: ListBodyProps) => {
  return (
    <div className="grow overflow-y-auto">
      <ul className="flex h-full flex-col">{children}</ul>
    </div>
  );
};

export const ListBodySkeleton = () => {
  return (
    <div className="grow overflow-y-auto">
      <ul className="flex h-full flex-col">
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className="w-full">
            <div className="block w-full p-4 font-bold">
              <div className="h-6 animate-pulse rounded-full bg-zinc-900 dark:bg-zinc-100" />
            </div>
            {index < 19 ? <Divider /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ListItemProps {
  divider?: boolean;
  children: React.ReactNode;
  to?: To;
}

export const ListItem = forwardRef(
  (
    {
      divider = false,
      children,
      ...props
    }: ListItemProps &
      (
        | Omit<Headless.ButtonProps, 'as' | 'className'>
        | Omit<Headless.ButtonProps<typeof NavLink>, 'as' | 'className'>
      ),
    ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    return (
      <li className="w-full">
        {'to' in props ? (
          <Headless.CloseButton
            as={NavLink}
            to={props.to as To}
            className={({ isActive }: { isActive: boolean }) =>
              clsx(
                'flex w-full items-center gap-2 p-4 font-bold',
                'hover:text-cyan-700 dark:hover:text-cyan-500',
                isActive ? 'text-cyan-600 dark:text-cyan-400' : '',
              )
            }
            ref={ref}
          >
            {children}
          </Headless.CloseButton>
        ) : (
          <Headless.Button
            className={clsx(
              'flex w-full cursor-default items-center gap-2 p-4 font-bold',
              'hover:text-cyan-700 dark:hover:text-cyan-500',
            )}
            ref={ref}
          >
            {children}
          </Headless.Button>
        )}
        {divider ? <Divider /> : null}
      </li>
    );
  },
);

interface ListFooterProps {
  children: React.ReactNode;
}

export const ListFooter = ({ children }: ListFooterProps) => {
  return (
    <>
      <Divider className="mb-4" />
      <div className="px-4 pb-4 md:px-0 md:pb-0">{children}</div>
    </>
  );
};

export default List;
