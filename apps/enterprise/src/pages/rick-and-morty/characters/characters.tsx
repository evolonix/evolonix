import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { GridLayout, GridLayoutItem } from '../../../components';
import {
  Alert,
  AlertActions,
  AlertTitle,
  Button,
  Divider,
  Input,
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/catalyst';
import { PageHeader } from '../../../components/page-header';
import { useScrollHeight } from '../../../lib';
import { Character, useCharacters } from '../../../lib/data-access';
import { CharacterDetails, CharacterDetailsSkeleton } from './character.details';
import { CharacterDialog } from './character.dialog';
import { CharacterList, CharacterListSkeleton } from './character.list';

export const Characters = () => {
  const { id } = useParams();
  const vm = useCharacters(id);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const listHeight = useScrollHeight(listRef, 48);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsHeight = useScrollHeight(detailsRef, 48);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const character = useRef<Character | undefined>(undefined);

  const handleAdd = () => {
    character.current = undefined;
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    character.current = vm.selected;
    setIsDialogOpen(true);
  };

  const handleSave = async (character: Character) => {
    const updated = await vm.save(character);
    setIsDialogOpen(false);
    navigate(`/rick-and-morty/characters/${updated?.id}`);
  };

  const handleDelete = () => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      setIsAlertOpen(false);
      navigate('/rick-and-morty/characters', { replace: true });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get('query') ?? undefined) as string | undefined;
    vm.search(query);
  };

  const handleClearSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      vm.search();
    }
  };

  const handlePreviousPage = async () => {
    await vm.previousPage();
    const list = listRef.current?.querySelector('.overflow-y-auto');
    list?.scrollTo({ top: 0 });
  };

  const handleNextPage = async () => {
    await vm.nextPage();
    const list = listRef.current?.querySelector('.overflow-y-auto');
    list?.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* {vm.hasErrors
        ? vm.errors.map((error, index) => (
            <div key={index} className="text-red-500">
              {error.message}
            </div>
          ))
        : null} */}
      <PageHeader label="Characters" actions={<Button onClick={handleAdd}>Add character</Button>} />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <div
            ref={listRef}
            style={{ '--list-scroll-height': listHeight } as React.CSSProperties}
            className="flex h-full flex-col overflow-hidden rounded border border-zinc-200 md:h-[var(--list-scroll-height)] dark:border-zinc-600"
          >
            <form noValidate method="POST" onSubmit={handleSearch} className="flex items-center gap-2 p-4">
              <Input
                type="search"
                name="query"
                placeholder="Search"
                defaultValue={vm.filter?.name || ''}
                autoFocus
                onInput={handleClearSearch}
              />
              <Button type="submit" disabled={vm.isLoading}>
                Search
              </Button>
            </form>
            <Divider />
            <div className="grow overflow-y-auto">
              {vm.showSkeleton ? <CharacterListSkeleton /> : <CharacterList characters={vm.characters} />}
            </div>
            <Divider />
            <Pagination className="p-4">
              <PaginationPrevious disabled={vm.isLoading || !vm.info?.prev} onClick={handlePreviousPage} />
              <PaginationNext disabled={vm.isLoading || !vm.info?.next} onClick={handleNextPage} />
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
                vm.showSkeleton || (vm.isLoading && !vm.selected) ? (
                  <CharacterDetailsSkeleton />
                ) : (
                  <CharacterDetails character={vm.selected} onEdit={handleEdit} onDelete={() => setIsAlertOpen(true)} />
                )
              ) : (
                <>
                  <h2 className="font-bold">Characters</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Explore the various characters from Rick & Morty. Click on a character to learn more about it.
                  </p>
                </>
              )}
            </div>
          </div>
        </GridLayoutItem>
      </GridLayout>

      <CharacterDialog character={character.current} isOpen={isDialogOpen} onClose={setIsDialogOpen} onSave={handleSave} />

      <Alert open={isAlertOpen} onClose={setIsAlertOpen}>
        <AlertTitle>Are you sure you want to delete this character?</AlertTitle>
        <AlertActions>
          <Button plain onClick={() => setIsAlertOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default Characters;
