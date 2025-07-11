import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const episode = useRef<Episode | undefined>(undefined);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
    navigate(
      vm.selected
        ? `/rick-and-morty/episodes/${vm.selected.id}`
        : '/rick-and-morty/episodes',
    );
  }, [vm.selected, navigate]);

  const handleSave = async (episode: Episode) => {
    const saved = await vm.save(episode);
    setShowDrawer(false);
    navigate(`/rick-and-morty/episodes/${saved?.id}`);
  };

  const handleDelete = useCallback(() => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      setShowAlert(false);
      navigate('/rick-and-morty/episodes', { replace: true });
    }
  }, [vm, navigate]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleAdd = () => {
      episode.current = undefined;
      setShowDrawer(true);
    };

    const handleEdit = () => {
      episode.current = vm.selected;
      setShowDrawer(true);
    };

    if (id === 'new') handleAdd();
    if (pathname.endsWith('/edit') && vm.selected) handleEdit();
  }, [id, pathname, vm.selected]);

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
        actions={
          <Button href="/rick-and-morty/episodes/new">Add episode</Button>
        }
      />
      <Divider className="mt-4" />
      <GridLayout>
        <GridLayoutItem md={4} lg={5} xl={4}>
          <EpisodeList />
        </GridLayoutItem>
        <GridLayoutItem md={4} lg={7} xl={8}>
          <EpisodeDetails
            onEdit={() =>
              navigate(`/rick-and-morty/episodes/${vm.selected?.id}/edit`)
            }
            onDelete={() => setShowAlert(true)}
          />
        </GridLayoutItem>
      </GridLayout>

      <EpisodeDrawer
        episode={episode.current}
        open={showDrawer}
        close={handleDrawerClose}
        onSave={handleSave}
      />

      <Alert open={showAlert} onClose={setShowAlert}>
        <AlertTitle>Are you sure you want to delete this episode?</AlertTitle>
        <AlertActions>
          <Button plain onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default Episodes;
