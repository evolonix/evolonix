import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link, NavLink, useLocation, useMatches } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Breadcrumbs from './breadcrumbs';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ];

export default function Header() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = matches
    .filter((match) => Boolean(match.data))
    .find(
      (match) =>
        match.pathname === pathname || match.pathname === `${pathname}/`
    );
  const data = match?.data as
    | {
        navigation: { name: string; to: string }[];
      }
    | undefined;
  const navigation = data?.navigation;

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-20 bg-white shadow dark:bg-slate-950"
    >
      {({ open }) => (
        <>
          <div className="overflow-hidden px-4 sm:px-6 lg:divide-y lg:divide-slate-200 lg:px-8 dark:lg:divide-slate-700">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img className="h-8 w-auto" src={logo} alt="Your Company" />
                  </Link>
                </div>
                <nav
                  className="ml-4 hidden lg:flex lg:space-x-4"
                  aria-label="Global"
                >
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      clsx(
                        isActive
                          ? 'border-sky-500 text-slate-900 dark:border-sky-400 dark:text-slate-50'
                          : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )
                    }
                  >
                    Dashboard
                  </NavLink>
                </nav>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-slate-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 dark:bg-slate-950 dark:text-slate-50 dark:ring-slate-600 dark:placeholder:text-slate-500 dark:focus:ring-sky-300 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:focus:ring-sky-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-slate-950 dark:text-slate-500 dark:hover:text-slate-400 dark:focus:ring-sky-400"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                // Profile dropdown
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-slate-950 dark:focus:ring-sky-400">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={clsx(
                                active ? 'bg-slate-100' : '',
                                'block px-4 py-2 text-sm text-slate-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>

            {navigation?.length ? (
              <nav
                className="hidden lg:flex lg:flex-wrap lg:gap-x-8 lg:gap-y-2 lg:py-2"
                aria-label="Local"
              >
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        isActive
                          ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                          : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50',
                        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            ) : null}
          </div>

          <Disclosure.Panel
            as="nav"
            className="bg-white shadow dark:bg-slate-950 lg:hidden"
            aria-label="Local"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as={NavLink}
                to="/dashboard"
                end
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                      : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )
                }
              >
                Dashboard
              </Disclosure.Button>
            </div>

            {navigation?.length ? (
              <div className="space-y-1 border-t border-slate-200 px-2 pb-3 pt-2 dark:border-slate-700">
                <Breadcrumbs className="flex" />

                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.to}
                    className={({ isActive }: { isActive: boolean }) =>
                      clsx(
                        isActive
                          ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                          : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            ) : null}

            {/* <div className="border-t border-slate-200 pb-3 pt-4 dark:border-slate-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-slate-800 dark:text-slate-100">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-slate-950 dark:text-slate-500 dark:hover:text-slate-400 dark:focus:ring-sky-400"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div> */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
