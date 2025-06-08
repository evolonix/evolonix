import { inject } from '@evolonix/react';
import { StoreApi, useStore } from 'zustand';

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { StarshipViewModel } from './starships.state';
import { StarshipStoreToken } from './starships.store';

export function useStarships(id?: string) {
  const store = inject<StoreApi<StarshipViewModel>>(StarshipStoreToken);
  const vm = useStore(store); // , useShallow(selectStarshipById(id)));
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        if (!id) await vm.loadAll({ search: undefined, pagination: { take: 20 } });
      } catch (error) {
        console.error('Failed to load starships:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  useEffect(() => {
    (async () => {
      try {
        if (id !== vm.selectedId) await vm.select(id);
      } catch (error) {
        console.error(`Failed to select starship with id ${id}:`, error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return vm;
}
