import { ManageList } from '@evolonix/manage-list-feature';
import { useEpisodes } from '@evolonix/rick-and-morty-data-access';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { EpisodeDetails } from './episode.details';
import { EpisodeDrawer } from './episode.drawer';
import { EpisodeList } from './episode.list';

export const Episodes = () => {
  const { id } = useParams();
  const vm = useEpisodes(id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Don't render on the server

  return (
    <>
      <ManageList
        isLoading={vm.isLoading}
        label="Manage Episodes"
        newUrl="/admin/rick-and-morty/episodes/new"
        list={
          <EpisodeList
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
          <EpisodeDetails
            isLoading={vm.isLoading}
            episode={vm.selected}
            onDelete={vm.handleDelete}
          />
        }
      />

      <EpisodeDrawer
        episode={vm.episode}
        isOpen={vm.showDrawer}
        onClose={vm.handleDrawerClose}
        onSave={vm.handleSave}
      />
    </>
  );
};

export default Episodes;
