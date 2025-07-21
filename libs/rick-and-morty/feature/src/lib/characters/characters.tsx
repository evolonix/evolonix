import { ManageList } from '@evolonix/manage-list-feature';
import { useCharacters } from '@evolonix/rick-and-morty-data-access';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CharacterDetails } from './character.details';
import { CharacterDrawer } from './character.drawer';
import { CharacterList } from './character.list';

export const Characters = () => {
  const { id } = useParams();
  const vm = useCharacters(id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Don't render on the server

  return (
    <>
      <ManageList
        isLoading={vm.isLoading}
        label="Manage Characters"
        newUrl="/admin/rick-and-morty/characters/new"
        list={
          <CharacterList
            showSkeleton={vm.showSkeleton}
            isLoading={vm.isLoading}
            list={vm.list}
            query={vm.query}
            pagination={vm.pagination}
            onSearch={vm.search}
            onPreviousPage={vm.previousPage}
            onNextPage={vm.nextPage}
          />
        }
        details={
          <CharacterDetails
            isLoading={vm.isLoading}
            character={vm.selected}
            onDelete={vm.handleDelete}
          />
        }
      />

      <CharacterDrawer
        character={vm.character}
        isOpen={vm.showDrawer}
        onClose={vm.handleDrawerClose}
        onSave={vm.handleSave}
      />
    </>
  );
};

export default Characters;
