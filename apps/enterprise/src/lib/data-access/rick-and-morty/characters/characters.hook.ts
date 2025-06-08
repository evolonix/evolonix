import { inject } from '@evolonix/react';
import { useEffect } from 'react';
import { StoreApi, useStore } from 'zustand';

import { CharacterViewModel } from './characters.state';
import { CharacterStoreToken } from './characters.store';

export function useCharacters(id?: string) {
  const store = inject<StoreApi<CharacterViewModel>>(CharacterStoreToken);
  const vm = useStore(store);

  useEffect(() => {
    (async () => {
      try {
        await vm.loadAll();
      } catch (error) {
        console.error('Failed to load characters:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (id !== vm.selectedId) await vm.select(id);
      } catch (error) {
        console.error(`Failed to select character with id ${id}:`, error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return vm;
}
