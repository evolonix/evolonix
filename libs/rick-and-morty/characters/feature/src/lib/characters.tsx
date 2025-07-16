import { ManageList } from '@evolonix/manage-list-feature';
import { useCharacters } from '@evolonix/rick-and-morty-characters-data-access';
import { GridLayout, GridLayoutItem } from '@evolonix/ui';
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
    <ManageList label="Characters" newUrl="/rick-and-morty/characters/new">
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <CharacterList
            list={vm.list}
            loading={vm.showSkeleton}
            query={vm.query}
            pagination={vm.pagination}
            onSearch={vm.search}
            onPreviousPage={vm.previousPage}
            onNextPage={vm.nextPage}
          />
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          {vm.selected ? (
            <CharacterDetails
              loading={vm.showSkeleton}
              character={vm.selected}
              onDelete={vm.handleDelete}
            />
          ) : null}
        </GridLayoutItem>
      </GridLayout>

      <CharacterDrawer
        character={vm.character}
        open={vm.showDrawer}
        close={vm.handleDrawerClose}
        onSave={vm.handleSave}
      />
    </ManageList>
  );
};

export default Characters;
