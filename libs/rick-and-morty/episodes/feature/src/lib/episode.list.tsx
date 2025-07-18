import { Search } from '@evolonix/ui';

import { PaginationDetails } from '@evolonix/manage-list-data-access';
import {
  List,
  ListBody,
  ListBodySkeleton,
  ListFooter,
  ListHeader,
  ListItem,
} from '@evolonix/manage-list-feature';
import { Episode } from '@evolonix/rick-and-morty-shared-data-access';
import { Pagination, PaginationNext, PaginationPrevious } from '@evolonix/ui';

interface EpisodeListProps {
  showSkeleton: boolean;
  isLoading: boolean;
  list: Episode[];
  query: string;
  pagination?: PaginationDetails;
  onSearch: (query?: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const EpisodeList = ({
  showSkeleton,
  isLoading,
  list,
  query,
  pagination,
  onSearch,
  onPreviousPage,
  onNextPage,
}: EpisodeListProps) => {
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
          {list.map((episode, index) => (
            <ListItem
              key={episode.id}
              to={`/rick-and-morty/episodes/${episode.id}`}
              divider={index < list.length - 1}
            >
              <span className="truncate">{episode.name}</span>
            </ListItem>
          ))}
          {list.length === 0 && <li className="py-4">No episodes found.</li>}
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
