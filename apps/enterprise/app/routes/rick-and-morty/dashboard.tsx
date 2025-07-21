import { useCharacters } from '@evolonix/rick-and-morty-data-access';
import {
  CharacterCard,
  CharacterCardSkeleton,
} from '@evolonix/rick-and-morty-feature';
import {
  GridLayout,
  GridLayoutItem,
  Heading,
  PageHeader,
  Pagination,
  PaginationNext,
  PaginationPrevious,
  Search,
} from '@evolonix/ui';
import { useEffect } from 'react';

export const RickAndMortyDashboard = () => {
  const vm = useCharacters();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [vm.list]);

  return (
    <>
      <PageHeader label="Rick & Morty" />
      <GridLayout>
        <GridLayoutItem>
          <Heading level={2}>Characters</Heading>
        </GridLayoutItem>
        <GridLayoutItem>
          <Search
            initialQuery={vm.query}
            disabled={vm.isLoading}
            autoFocus
            onSearch={vm.search}
          />
        </GridLayoutItem>
        {vm.showSkeleton
          ? Array.from({ length: 6 }).map((_, index) => (
              <GridLayoutItem key={index} xl={6}>
                <CharacterCardSkeleton />
              </GridLayoutItem>
            ))
          : vm.list.map((character) => (
              <GridLayoutItem key={character.id} xl={6}>
                <CharacterCard isLoading={vm.isLoading} character={character} />
              </GridLayoutItem>
            ))}
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
