import { ManageList } from '@evolonix/manage-list-feature';
import { useLocations } from '@evolonix/rick-and-morty-data-access';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LocationDetails } from './location.details';
import { LocationDrawer } from './location.drawer';
import { LocationList } from './location.list';

export const Locations = () => {
  const { id } = useParams();
  const vm = useLocations(id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Don't render on the server

  return (
    <>
      <ManageList
        isLoading={vm.isLoading}
        label="Manage Locations"
        newUrl="/admin/rick-and-morty/locations/new"
        list={
          <LocationList
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
          <LocationDetails
            isLoading={vm.isLoading}
            location={vm.selected}
            onDelete={vm.handleDelete}
          />
        }
      />

      <LocationDrawer
        location={vm.location}
        isOpen={vm.showDrawer}
        onClose={vm.handleDrawerClose}
        onSave={vm.handleSave}
      />
    </>
  );
};

export default Locations;
