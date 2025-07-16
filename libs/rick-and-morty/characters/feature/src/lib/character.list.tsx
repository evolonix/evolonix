import clsx from 'clsx';
import { NavLink } from 'react-router';

import { Search } from '@evolonix/ui';

import { Pagination as PaginationType } from '@evolonix/data-access';
import {
  List,
  ListBody,
  ListBodySkeleton,
  ListFooter,
  ListHeader,
  ListItem,
} from '@evolonix/manage-list-feature';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import { Pagination, PaginationNext, PaginationPrevious } from '@evolonix/ui';

interface CharacterListProps {
  loading: boolean;
  list: Character[];
  query: string;
  pagination?: PaginationType;
  onSearch: (query?: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const CharacterList = ({
  list,
  loading,
  query,
  pagination,
  onSearch,
  onPreviousPage,
  onNextPage,
}: CharacterListProps) => {
  return (
    <List list={list}>
      <ListHeader>
        <Search
          initialQuery={query}
          disabled={loading}
          autoFocus
          onSearch={onSearch}
        />
      </ListHeader>
      {loading ? (
        <ListBodySkeleton />
      ) : (
        <ListBody>
          {list.map((character, index) => (
            <ListItem key={character.id} divider={index < list.length - 1}>
              <NavLink
                to={`/rick-and-morty/characters/${character.id}`}
                className={({ isActive }) =>
                  clsx(
                    'flex w-full items-center gap-2 p-4 font-bold',
                    'hover:text-cyan-700 dark:hover:text-cyan-500',
                    isActive ? 'text-cyan-600 dark:text-cyan-400' : '',
                  )
                }
              >
                <span className="truncate">{character.name}</span>
              </NavLink>
            </ListItem>
          ))}
          {list.length === 0 && <ListItem>No characters found.</ListItem>}
        </ListBody>
      )}
      <ListFooter>
        <Pagination>
          <PaginationPrevious
            disabled={loading || !pagination?.prev}
            onClick={onPreviousPage}
          />
          <PaginationNext
            disabled={loading || !pagination?.next}
            onClick={onNextPage}
          />
        </Pagination>
      </ListFooter>
    </List>
  );
};
