import { inject } from '@evolonix/react';
import { useEffect } from 'react';
import { StoreApi, useStore } from 'zustand';

import { CharacterStoreToken } from './characters.providers';
import { CharacterViewModel } from './characters.state';

export function useCharacters(id?: string) {
  const store = inject<StoreApi<CharacterViewModel>>(CharacterStoreToken);
  const vm = useStore(store);

  useEffect(() => {
    (async () => {
      await vm.loadAll(vm.page, vm.query);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vm.page, vm.query]);

  useEffect(() => {
    (async () => {
      await vm.select(id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return vm;
}
