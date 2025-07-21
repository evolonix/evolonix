import { Episode } from '@evolonix/rick-and-morty-data-access';
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
import EpisodeEditForm from './episode.form';

interface EpisodeDrawerProps {
  episode?: Episode;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (episode: Episode) => Promise<void>;
}

export const EpisodeDrawer = ({
  episode,
  isOpen,
  onClose,
  onSave,
}: EpisodeDrawerProps) => {
  const episodeForm = useRef<HTMLFormElement | null>(null);

  return (
    <Drawer preventCloseOnOutsideClick open={isOpen} close={onClose}>
      <DrawerHeader>
        <DrawerTitle>{`${episode ? 'Edit' : 'New'} episode`}</DrawerTitle>
        <DrawerDescription>
          {episode ? (
            <>
              Edit the details of the episode{' '}
              <span className="font-bold">{episode?.name}</span>.
            </>
          ) : (
            <>Add a new episode.</>
          )}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerBody className="flex flex-col gap-8">
        <EpisodeEditForm
          ref={episodeForm}
          episode={episode}
          onSubmit={onSave}
        />
      </DrawerBody>
      <DrawerActions>
        <Button
          type="submit"
          onClick={() => episodeForm.current?.requestSubmit()}
        >
          Save
        </Button>
        <Button plain onClick={() => onClose(false)}>
          Cancel
        </Button>
      </DrawerActions>
    </Drawer>
  );
};
