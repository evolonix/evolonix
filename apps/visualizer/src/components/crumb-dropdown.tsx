import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Preview } from '../data';

export default function CrumbDropdown({
  preview,
  navigation,
}: {
  preview: Preview;
  navigation: { name: string; to: string }[];
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="ml-4 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1.5 py-1 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-50 dark:ring-slate-600 dark:hover:bg-slate-900">
          {preview.name}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {navigation.map((item) => (
              <Menu.Item key={item.to}>
                {({ active }) => (
                  <Link
                    to={item.to}
                    className={clsx(
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
