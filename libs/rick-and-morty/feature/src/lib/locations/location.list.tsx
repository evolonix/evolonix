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
import { Location } from '@evolonix/rick-and-morty-data-access';
import { Pagination, PaginationNext, PaginationPrevious } from '@evolonix/ui';

interface LocationListProps {
  showSkeleton: boolean;
  isLoading: boolean;
  list: Location[];
  query: string;
  pagination?: PaginationDetails;
  onSearch: (query?: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const LocationList = ({
  showSkeleton,
  isLoading,
  list,
  query,
  pagination,
  onSearch,
  onPreviousPage,
  onNextPage,
}: LocationListProps) => {
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
          {list.map((location, index) => (
            <ListItem
              key={location.id}
              to={`/admin/rick-and-morty/locations/${location.id}`}
              divider={index < list.length - 1}
            >
              <span className="truncate">{location.name}</span>
            </ListItem>
          ))}
          {list.length === 0 && <li className="py-4">No locations found.</li>}
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
