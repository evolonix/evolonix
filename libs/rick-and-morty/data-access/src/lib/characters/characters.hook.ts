import { ListViewModel } from '@evolonix/manage-list-data-access';
import { inject } from '@evolonix/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { StoreApi, useStore } from 'zustand';

import { Character } from '../models';
import { CharactersStoreToken } from './characters.providers';

export function useCharacters(id?: string) {
  const store =
    inject<StoreApi<ListViewModel<Character>>>(CharactersStoreToken);
  const vm = useStore(store);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const character = useRef<Character | undefined>(undefined);

  const handleDelete = useCallback(() => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      navigate('/admin/rick-and-morty/characters', { replace: true });
    }
  }, [vm, navigate]);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
    navigate(
      vm.selected
        ? `/admin/rick-and-morty/characters/${vm.selected.id}`
        : '/admin/rick-and-morty/characters',
    );
  }, [vm.selected, navigate]);

  const handleSave = async (character: Character) => {
    const saved = await vm.save(character);
    setShowDrawer(false);
    navigate(`/admin/rick-and-morty/characters/${saved?.id}`);
  };

  useEffect(() => {
    const handleAdd = () => {
      character.current = undefined;
      setShowDrawer(true);
    };

    const handleEdit = () => {
      character.current = vm.selected;
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
    character: character.current,
    showDrawer,
    handleDelete,
    handleDrawerClose,
    handleSave,
  };
}

export function useAllCharacters() {
  const store =
    inject<StoreApi<ListViewModel<Character>>>(CharactersStoreToken);
  const vm = useStore(store);

  useEffect(() => {
    (async () => {
      await vm.loadAll(vm.query);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vm.query]);

  return vm;
}
