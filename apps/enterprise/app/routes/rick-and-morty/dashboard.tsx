import { useCharacters } from '@evolonix/rick-and-morty-data-access';
import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@evolonix/rick-and-morty-feature';
import {
  GridLayout,
  GridLayoutItem,
  PageHeader,
  Pagination,
  PaginationNext,
  PaginationPrevious,
  Search,
} from '@evolonix/ui';
import { useEffect } from 'react';
import { breadcrumbMap } from '../../breadcrumbs';

export const RickAndMortyDashboard = () => {
  const vm = useCharacters();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [vm.list]);

  return (
    <>
      <PageHeader label="Characters" breadcrumbMap={breadcrumbMap} />
      <GridLayout>
        <GridLayoutItem>
          <Search
            initialQuery={vm.query}
            disabled={vm.isLoading}
            autoFocus
            onSearch={vm.search}
          />
          <Pagination>
            <PaginationPrevious
              disabled={vm.isLoading || !vm.pagination?.prev}
              onClick={vm.previousPage}
            />
            <PaginationNext
              disabled={vm.isLoading || !vm.pagination?.next}
              onClick={vm.nextPage}
            />
          </Pagination>
        </GridLayoutItem>
        {vm.showSkeleton ? (
          Array.from({ length: 6 }).map((_, index) => (
            <GridLayoutItem key={index} xl={6}>
              <CharacterCardSkeleton />
            </GridLayoutItem>
          ))
        ) : vm.list.length ? (
          vm.list.map((character) => (
            <GridLayoutItem key={character.id} xl={6}>
              <CharacterCard isLoading={vm.isLoading} character={character} />
            </GridLayoutItem>
          ))
        ) : (
          <GridLayoutItem>No characters found</GridLayoutItem>
        )}
        <GridLayoutItem>
          <Pagination>
            <PaginationPrevious
              disabled={vm.isLoading || !vm.pagination?.prev}
              onClick={vm.previousPage}
            />
            <PaginationNext
              disabled={vm.isLoading || !vm.pagination?.next}
              onClick={vm.nextPage}
            />
          </Pagination>
        </GridLayoutItem>
      </GridLayout>
    </>
  );
};

export default RickAndMortyDashboard;
