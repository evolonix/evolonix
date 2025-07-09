import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

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
import { CharacterDialog } from './character.dialog';
import { CharacterList } from './character.list';

export const Characters = () => {
  const { id } = useParams();
  const vm = useCharacters(id);
  const navigate = useNavigate();
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
    const saved = await vm.save(character);
    setIsDialogOpen(false);
    navigate(`/rick-and-morty/characters/${saved?.id}`);
  };

  const handleDelete = () => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      setIsAlertOpen(false);
      navigate('/rick-and-morty/characters', { replace: true });
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        actions={<Button onClick={handleAdd}>Add character</Button>}
      />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <CharacterList />
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          <CharacterDetails
            onEdit={handleEdit}
            onDelete={() => setIsAlertOpen(true)}
          />
        </GridLayoutItem>
      </GridLayout>

      <CharacterDialog
        character={character.current}
        isOpen={isDialogOpen}
        onClose={setIsDialogOpen}
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
