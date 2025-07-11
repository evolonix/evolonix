import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useEpisodes } from '@evolonix/rick-and-morty-episodes-data-access';
import { Episode } from '@evolonix/rick-and-morty-shared-data-access';
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
import { EpisodeDetails } from './episode.details';
import { EpisodeDrawer } from './episode.drawer';
import { EpisodeList } from './episode.list';

export const Episodes = () => {
  const { id } = useParams();
  const vm = useEpisodes(id);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const episode = useRef<Episode | undefined>(undefined);

  const handleAdd = () => {
    episode.current = undefined;
    setIsDrawerOpen(true);
  };

  const handleEdit = () => {
    episode.current = vm.selected;
    setIsDrawerOpen(true);
  };

  const handleSave = async (episode: Episode) => {
    const saved = await vm.save(episode);
    setIsDrawerOpen(false);
    navigate(`/rick-and-morty/episodes/${saved?.id}`);
  };

  const handleDelete = () => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      setIsAlertOpen(false);
      navigate('/rick-and-morty/episodes', { replace: true });
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Don't render on the server

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
        label="Episodes"
        actions={<Button onClick={handleAdd}>Add episode</Button>}
      />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <EpisodeList />
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          <EpisodeDetails
            onEdit={handleEdit}
            onDelete={() => setIsAlertOpen(true)}
          />
        </GridLayoutItem>
      </GridLayout>

      <EpisodeDrawer
        episode={episode.current}
        isOpen={isDrawerOpen}
        onClose={setIsDrawerOpen}
        onSave={handleSave}
      />

      <Alert open={isAlertOpen} onClose={setIsAlertOpen}>
        <AlertTitle>Are you sure you want to delete this episode?</AlertTitle>
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

export default Episodes;
