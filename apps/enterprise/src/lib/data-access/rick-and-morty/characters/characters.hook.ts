import { inject } from '@evolonix/react';
import { StoreApi, useStore } from 'zustand';

import { useEffect } from 'react';
import { CharacterViewModel } from './characters.state';
import { CharacterStoreToken } from './characters.store';

export function useCharacters(id?: string, take?: number) {
  const store = inject<StoreApi<CharacterViewModel>>(CharacterStoreToken);
  const vm = useStore(store); // , useShallow(selectCharacterById(id)));

  useEffect(() => {
    (async () => {
      try {
        await vm.loadAll();
      } catch (error) {
        console.error('Failed to load characters:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take]);

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
