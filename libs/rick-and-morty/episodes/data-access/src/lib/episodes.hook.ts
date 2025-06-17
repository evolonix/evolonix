import { inject } from '@evolonix/react';
import { useEffect } from 'react';
import { StoreApi, useStore } from 'zustand';

import { EpisodeStoreToken } from './episodes.providers';
import { EpisodeViewModel } from './episodes.state';

export function useEpisodes(id?: string) {
  const store = inject<StoreApi<EpisodeViewModel>>(EpisodeStoreToken);
  const vm = useStore(store);

  useEffect(() => {
    (async () => {
      await vm.loadAll();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (id !== vm.selectedId) await vm.select(id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return vm;
}
