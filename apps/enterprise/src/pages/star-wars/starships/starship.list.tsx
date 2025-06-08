import clsx from 'clsx';
import { Fragment } from 'react';
import { NavLink } from 'react-router';

import { Divider } from '../../../components/catalyst';
import { Starship } from '../../../lib/data-access';

interface StarshipListProps {
  starships: Starship[];
}

export const StarshipList = ({ starships }: StarshipListProps) => {
  return starships.length ? (
    <ul className="flex h-full flex-col items-center">
      {starships.map((starship, index) => (
        <Fragment key={starship.id}>
          <li className="w-full">
            <NavLink
              to={`/star-wars/starships/${starship.id}`}
              className={({ isActive }) =>
                clsx(
                  'block w-full p-4 font-bold',
                  'hover:text-cyan-700 dark:hover:text-cyan-500',
                  isActive ? 'text-cyan-600 dark:text-cyan-400' : ''
                )
              }
            >
              {starship.name}
            </NavLink>
            {index < starships.length - 1 ? <Divider /> : null}
          </li>
        </Fragment>
      ))}
    </ul>
  ) : (
    <div className="flex h-full">
      <p className="p-4 text-zinc-500 dark:text-zinc-400">No starships found.</p>
    </div>
  );
};

export const StarshipListSkeleton = () => {
  return (
    <ul className="flex h-full flex-col items-center">
      {Array.from({ length: 20 }).map((_, index) => (
        <Fragment key={index}>
          <li className="w-full">
            <div className="block w-full p-4 font-bold">
              <div className="h-6 animate-pulse rounded-full bg-zinc-900 dark:bg-zinc-100" />
            </div>
            {index < 10 ? <Divider /> : null}
          </li>
        </Fragment>
      ))}
    </ul>
  );
};
