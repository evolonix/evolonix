import { ListViewModel } from '@evolonix/manage-list-data-access';
import { inject } from '@evolonix/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { StoreApi, useStore } from 'zustand';

import { Episode } from '../models';
import { EpisodesStoreToken } from './episodes.providers';

export function useEpisodes(id?: string) {
  const store = inject<StoreApi<ListViewModel<Episode>>>(EpisodesStoreToken);
  const vm = useStore(store);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const episode = useRef<Episode | undefined>(undefined);

  const handleDelete = useCallback(() => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      navigate('/admin/rick-and-morty/episodes', { replace: true });
    }
  }, [vm, navigate]);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
    navigate(
      vm.selected
        ? `/admin/rick-and-morty/episodes/${vm.selected.id}`
        : '/admin/rick-and-morty/episodes',
    );
  }, [vm.selected, navigate]);

  const handleSave = async (episode: Episode) => {
    const saved = await vm.save(episode);
    setShowDrawer(false);
    navigate(`/admin/rick-and-morty/episodes/${saved?.id}`);
  };

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

  useEffect(() => {
    (async () => {
      await vm.loadPaged(vm.page, vm.query);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vm.page, vm.query]);

  useEffect(() => {
    if (id === 'new') return;

    (async () => {
      await vm.select(id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    ...vm,
    episode: episode.current,
    showDrawer,
    handleDelete,
    handleDrawerClose,
    handleSave,
  };
}
