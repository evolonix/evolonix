import {
  Button,
  Divider,
  GridLayout,
  GridLayoutItem,
  NavbarItem,
  PageHeader,
} from '@evolonix/ui';
import { useScrollHeight } from '@evolonix/util';
import * as Headless from '@headlessui/react';
import { Bars3Icon, PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState } from 'react';

interface ManagerListProps {
  label: string;
  newUrl: string;
  list: React.ReactNode;
  details: React.ReactNode;
}

function CloseMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function MobileList({
  isOpen,
  children,
  onClose,
}: React.PropsWithChildren<{ isOpen: boolean; onClose: () => void }>) {
  return (
    <Headless.Dialog open={isOpen} onClose={onClose} className="lg:hidden">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <Headless.DialogPanel
        transition
        className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full"
      >
        <div className="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="px-4 pt-3">
            <Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
          <div className="flex flex-col overflow-y-hidden">{children}</div>
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  );
}

export function ManageList({ label, newUrl, list, details }: ManagerListProps) {
  const [showList, setShowList] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);

  useEffect(() => {
    const list = listRef.current?.querySelector('.overflow-y-auto');
    list?.scrollTo({ top: 0 });
  }, [list]);

  return (
    <>
      {/* List on mobile */}
      <MobileList isOpen={showList} onClose={() => setShowList(false)}>
        {list}
      </MobileList>

      <PageHeader
        label={label}
        actions={
          <Button href={newUrl}>
            <PlusIcon />
            Add
          </Button>
        }
      >
        <Button
          onClick={() => setShowList(true)}
          aria-label="Open list navigation"
          className="lg:hidden"
        >
          <Bars3Icon />
          Show List
        </Button>
      </PageHeader>
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4} className="max-lg:hidden">
          <div
            ref={listRef}
            style={
              { '--list-scroll-height': listHeight } as React.CSSProperties
            }
            className="flex flex-col md:h-[var(--list-scroll-height)]"
          >
            {list}
          </div>
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          {details}
        </GridLayoutItem>
      </GridLayout>
    </>
  );
}

export default ManageList;
