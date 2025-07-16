import { Character } from '@evolonix/rick-and-morty-shared-data-access';
import {
  Button,
  Drawer,
  DrawerActions,
  DrawerBody,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@evolonix/ui';
import { useRef } from 'react';
import CharacterEditForm from './character.form';

interface CharacterDrawerProps {
  character?: Character;
  open: boolean;
  close: (value: boolean) => void;
  onSave: (character: Character) => void;
}

export const CharacterDrawer = ({
  character,
  open,
  close,
  onSave,
}: CharacterDrawerProps) => {
  const characterForm = useRef<HTMLFormElement | null>(null);

  return (
    <Drawer preventCloseOnOutsideClick open={open} close={close}>
      <DrawerHeader>
        <DrawerTitle>{`${character ? 'Edit' : 'New'} character`}</DrawerTitle>
        <DrawerDescription>
          {character ? (
            <>
              Edit the details of the character{' '}
              <span className="font-bold">{character.name}</span>.
            </>
          ) : (
            <>Add a new character.</>
          )}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerBody className="flex flex-col gap-8">
        <CharacterEditForm
          ref={characterForm}
          character={character}
          onSubmit={onSave}
        />
      </DrawerBody>
      <DrawerActions>
        <Button
          type="submit"
          onClick={() => characterForm.current?.requestSubmit()}
        >
          Save
        </Button>
        <Button plain onClick={() => close(false)}>
          Cancel
        </Button>
      </DrawerActions>
    </Drawer>
  );
};
