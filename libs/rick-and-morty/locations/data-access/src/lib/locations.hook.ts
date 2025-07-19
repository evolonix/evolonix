import { ListViewModel } from '@evolonix/manage-list-data-access';
import { inject } from '@evolonix/react';
import { Location } from '@evolonix/rick-and-morty-shared-data-access';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { StoreApi, useStore } from 'zustand';
import { LocationStoreToken } from './locations.providers';

export function useLocations(id?: string) {
  const store = inject<StoreApi<ListViewModel<Location>>>(LocationStoreToken);
  const vm = useStore(store);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const location = useRef<Location | undefined>(undefined);

  const handleDelete = useCallback(() => {
    if (vm.selected?.id) {
      vm.delete(vm.selected.id);
      navigate('/rick-and-morty/locations', { replace: true });
    }
  }, [vm, navigate]);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
    navigate(
      vm.selected
        ? `/rick-and-morty/locations/${vm.selected.id}`
        : '/rick-and-morty/locations',
    );
  }, [vm.selected, navigate]);

  const handleSave = async (location: Location) => {
    const saved = await vm.save(location);
    setShowDrawer(false);
    navigate(`/rick-and-morty/locations/${saved?.id}`);
  };

  useEffect(() => {
    const handleAdd = () => {
      location.current = undefined;
      setShowDrawer(true);
    };

    const handleEdit = () => {
      location.current = vm.selected;
      setShowDrawer(true);
    };

    if (id === 'new') handleAdd();
    if (pathname.endsWith('/edit') && vm.selected) handleEdit();
  }, [id, pathname, vm.selected]);

  useEffect(() => {
    (async () => {
      await vm.loadAll(vm.page, vm.query);
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
    location: location.current,
    showDrawer,
    handleDelete,
    handleDrawerClose,
    handleSave,
  };
}
