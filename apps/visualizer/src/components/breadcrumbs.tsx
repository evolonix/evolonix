import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { NavLink, useMatches } from 'react-router-dom';

export default function Breadcrumbs({ className }: { className: string }) {
  const matches = useMatches();
  const crumbs = matches
    // First get rid of any matches that don't have handle and crumb
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((match) => Boolean((match.handle as any | undefined)?.crumb))
    // Now map them into an array of elements, passing the loader
    // data to each one
    .map((match) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (match.handle as { crumb: (data: any) => ReactElement }).crumb(match.data)
    );

  return (
    <nav className={clsx('mb-4', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <li>
          <div>
            <NavLink
              to="/"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </NavLink>
          </div>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
              {crumb}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
