import clsx from 'clsx';
import { Fragment } from 'react';
import { NavLink } from 'react-router';

import { Character } from '@evolonix/rick-and-morty-data-access-characters';
import { Divider } from '@evolonix/ui';

interface CharacterListProps {
  characters: (Partial<Character> | null)[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  return characters.length ? (
    <ul className="flex h-full flex-col items-center">
      {characters.map((character, index) =>
        character ? (
          <Fragment key={character.id}>
            <li className="w-full">
              <NavLink
                to={`/rick-and-morty/characters/${character.id}`}
                className={({ isActive }) =>
                  clsx(
                    'block w-full p-4 font-bold',
                    'hover:text-cyan-700 dark:hover:text-cyan-500',
                    isActive ? 'text-cyan-600 dark:text-cyan-400' : '',
                  )
                }
              >
                {character.name}
              </NavLink>
              {index < characters.length - 1 ? <Divider /> : null}
            </li>
          </Fragment>
        ) : null,
      )}
    </ul>
  ) : (
    <div className="flex h-full">
      <p className="p-4 text-zinc-500 dark:text-zinc-400">
        No characters found.
      </p>
    </div>
  );
};

export const CharacterListSkeleton = () => {
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
