import { Entity } from '@evolonix/data-access';
import { Divider } from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';
import { useEffect, useRef } from 'react';

interface ListProps {
  list?: Entity[];
  children: React.ReactNode;
}

export const List = ({ list, children }: ListProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);

  useEffect(() => {
    const list = listRef.current?.querySelector('.overflow-y-auto');
    list?.scrollTo({ top: 0 });
  }, [list]);

  return (
    <div
      ref={listRef}
      style={{ '--list-scroll-height': listHeight } as React.CSSProperties}
      className="flex h-[var(--list-scroll-height)] flex-col"
    >
      {children}
    </div>
  );
};

interface ListHeaderProps {
  children: React.ReactNode;
}

export const ListHeader = ({ children }: ListHeaderProps) => {
  return (
    <>
      {children}
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
      <ul className="flex h-full flex-col items-center">{children}</ul>
    </div>
  );
};

export const ListBodySkeleton = () => {
  return (
    <div className="grow overflow-y-auto">
      <ul className="flex h-full flex-col items-center">
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
}

export const ListItem = ({ divider = false, children }: ListItemProps) => {
  return (
    <>
      <li className="w-full">{children}</li>
      {divider ? <Divider /> : null}
    </>
  );
};

interface ListFooterProps {
  children: React.ReactNode;
}

export const ListFooter = ({ children }: ListFooterProps) => {
  return (
    <>
      <Divider className="mb-4" />
      {children}
    </>
  );
};

export default List;
