import { Location } from '@evolonix/rick-and-morty-data-access';
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
import LocationEditForm from './location.form';

interface LocationDrawerProps {
  location?: Location;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSave: (location: Location) => Promise<void>;
}

export const LocationDrawer = ({
  location,
  isOpen,
  onClose,
  onSave,
}: LocationDrawerProps) => {
  const locationForm = useRef<HTMLFormElement | null>(null);

  return (
    <Drawer preventCloseOnOutsideClick open={isOpen} close={onClose}>
      <DrawerHeader>
        <DrawerTitle>{`${location ? 'Edit' : 'New'} location`}</DrawerTitle>
        <DrawerDescription>
          {location ? (
            <>
              Edit the details of the location{' '}
              <span className="font-bold">{location?.name}</span>.
            </>
          ) : (
            <>Add a new location.</>
          )}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerBody className="flex flex-col gap-8">
        <LocationEditForm
          ref={locationForm}
          location={location}
          onSubmit={onSave}
        />
      </DrawerBody>
      <DrawerActions>
        <Button
          type="submit"
          onClick={() => locationForm.current?.requestSubmit()}
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
