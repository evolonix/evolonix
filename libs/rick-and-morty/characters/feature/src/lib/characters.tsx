import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { useCharacters } from '@evolonix/rick-and-morty-characters-data-access';
import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import {
  Alert,
  AlertActions,
  AlertTitle,
  Button,
  Divider,
  GridLayout,
  GridLayoutItem,
  PageHeader,
} from '@evolonix/ui';
import { CharacterDetails } from './character.details';
import { CharacterDrawer } from './character.drawer';
import { CharacterList } from './character.list';

export const Characters = () => {
  const { id } = useParams();
  const vm = useCharacters(id);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const character = useRef<Character | undefined>(undefined);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
    navigate(
      vm.selected
        ? `/rick-and-morty/characters/${vm.selected.id}`
        : '/rick-and-morty/characters',
    );
  }, [vm.selected, navigate]);

  const handleSave = async (character: Character) => {
    const saved = await vm.save(character);
    setIsDrawerOpen(false);
    navigate(`/rick-and-morty/characters/${saved?.id}`);
  };

  const handleDelete = useCallback(() => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      setIsAlertOpen(false);
      navigate('/rick-and-morty/characters', { replace: true });
    }
  }, [vm, navigate]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleAdd = () => {
      character.current = undefined;
      setIsDrawerOpen(true);
    };

    const handleEdit = () => {
      character.current = vm.selected;
      setIsDrawerOpen(true);
    };

    if (id === 'new') handleAdd();
    if (pathname.endsWith('/edit') && vm.selected) handleEdit();
  }, [id, pathname, vm.selected]);

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <>
      {/* TODO: Show errors in a toast */}
      {/* {vm.hasErrors
        ? vm.errors.map((error, index) => (
            <div key={index} className="text-red-500">
              {error.message}
            </div>
          ))
        : null} */}
      <PageHeader
        label="Characters"
        actions={
          <Button href="/rick-and-morty/characters/new">Add character</Button>
        }
      />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <CharacterList />
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          <CharacterDetails
            onEdit={() =>
              navigate(`/rick-and-morty/characters/${vm.selected?.id}/edit`)
            }
            onDelete={() => setIsAlertOpen(true)}
          />
        </GridLayoutItem>
      </GridLayout>

      <CharacterDrawer
        character={character.current}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onSave={handleSave}
      />

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
