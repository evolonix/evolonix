import { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { GridLayout, GridLayoutItem } from '../../../components';
import { Button, Divider, Input, Pagination, PaginationNext, PaginationPrevious } from '../../../components/catalyst';
import { PageHeader } from '../../../components/page-header';
import { useScrollHeight } from '../../../lib';
import { Character, useCharacters } from '../../../lib/data-access';
import { CharacterDetails, CharacterDetailsSkeleton } from './character.details';
import { CharacterDialog } from './character.dialog';
import { CharacterList, CharacterListSkeleton } from './character.list';

export const Characters = () => {
  const { id } = useParams();
  const vm = useCharacters(id, 20);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsHeight = useScrollHeight(detailsRef, 48);
  const [isOpen, setIsOpen] = useState(false);
  const character = useRef<Character | undefined>(undefined);

  const handleAdd = () => {
    character.current = undefined;
    setIsOpen(true);
  };

  const handleEdit = () => {
    character.current = vm.selected;
    setIsOpen(true);
  };

  const handleSave = useCallback(
    async (character: Character) => {
      const updated = await vm.save(character);
      setIsOpen(false);
      navigate(`/star-wars/characters/${updated?.id}`);
    },
    [vm, navigate]
  );

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (vm.selected?.id && confirm(`Are you sure you want to delete the character "${vm.selected.name}"?`)) {
      vm.delete(vm.selected.id);
      navigate('/star-wars/characters', { replace: true });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    vm.search(search);
  };

  return (
    <>
      <PageHeader label="Characters" actions={<Button onClick={handleAdd}>Add character</Button>} />
      <Divider className="mt-4" />
      <GridLayout>
        {vm.showSkeleton || vm.characters.length ? (
          <>
            <GridLayoutItem md={4} lg={5} xl={4}>
              <div
                ref={listRef}
                style={{ '--list-scroll-height': listHeight } as React.CSSProperties}
                className="flex h-full flex-col overflow-hidden rounded border border-zinc-200 md:h-[var(--list-scroll-height)] dark:border-zinc-600"
              >
                <form noValidate method="POST" onSubmit={handleSearch} className="flex items-center gap-2 p-4">
                  <Input name="search" placeholder="Search" defaultValue={vm.filter.name || ''} autoFocus />
                  <Button type="submit" disabled={vm.showSkeleton}>
                    Search
                  </Button>
                </form>
                <Divider />
                <div className="grow overflow-y-auto">
                  {vm.showSkeleton ? <CharacterListSkeleton /> : <CharacterList characters={vm.characters} />}
                </div>
                <Divider />
                <Pagination className="p-4">
                  <PaginationPrevious
                    disabled={vm.showSkeleton || !vm.info.prev}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={() => vm.loadAll(vm.info.prev!)}
                  />
                  <PaginationNext
                    disabled={vm.showSkeleton || !vm.info.next}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={() => vm.loadAll(vm.info.next!)}
                  />
                </Pagination>
              </div>
            </GridLayoutItem>
            <GridLayoutItem md={4} lg={7} xl={8}>
              <div
                ref={detailsRef}
                style={{ '--details-scroll-height': detailsHeight } as React.CSSProperties}
                className="h-full overflow-hidden md:max-h-[var(--details-scroll-height)]"
              >
                <div className="flex h-full flex-col">
                  {id ? (
                    vm.showSkeleton ? (
                      <CharacterDetailsSkeleton />
                    ) : vm.selected ? (
                      <CharacterDetails character={vm.selected} onEdit={handleEdit} onDelete={handleDelete} />
                    ) : null
                  ) : (
                    <>
                      <h2 className="font-bold">Characters</h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Explore the various characters from the Star Wars universe. Click on a character to learn more about it.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </GridLayoutItem>
          </>
        ) : (
          <GridLayoutItem>
            <div className="flex flex-col items-center justify-center">
              <p className="text-zinc-500 dark:text-zinc-400">No characters found.</p>
            </div>
          </GridLayoutItem>
        )}
      </GridLayout>

      <CharacterDialog character={character.current} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} />
    </>
  );
};

export default Characters;
