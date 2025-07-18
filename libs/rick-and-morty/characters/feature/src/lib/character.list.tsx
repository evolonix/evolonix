import { Avatar, Search } from '@evolonix/ui';

import { PaginationDetails } from '@evolonix/manage-list-data-access';
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
  showSkeleton: boolean;
  isLoading: boolean;
  list: Character[];
  query: string;
  pagination?: PaginationDetails;
  onSearch: (query?: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const CharacterList = ({
  showSkeleton,
  isLoading,
  list,
  query,
  pagination,
  onSearch,
  onPreviousPage,
  onNextPage,
}: CharacterListProps) => {
  return (
    <List>
      <ListHeader>
        <Search
          initialQuery={query}
          disabled={isLoading}
          autoFocus
          onSearch={onSearch}
        />
      </ListHeader>
      {showSkeleton ? (
        <ListBodySkeleton />
      ) : (
        <ListBody className={isLoading ? 'animate-pulse' : ''}>
          {list.map((character, index) => (
            <ListItem
              key={character.id}
              to={`/rick-and-morty/characters/${character.id}`}
              divider={index < list.length - 1}
            >
              <Avatar
                src={character.image}
                alt={character.name}
                initials={character.name
                  ?.split(' ')
                  ?.map((name) => name.charAt(0))
                  .join('')}
                className="size-10"
              />
              <span className="truncate">{character.name}</span>
            </ListItem>
          ))}
          {list.length === 0 && <li className="py-4">No characters found.</li>}
        </ListBody>
      )}
      <ListFooter>
        <Pagination>
          <PaginationPrevious
            disabled={isLoading || !pagination?.prev}
            onClick={onPreviousPage}
          />
          <PaginationNext
            disabled={isLoading || !pagination?.next}
            onClick={onNextPage}
          />
        </Pagination>
      </ListFooter>
    </List>
  );
};
