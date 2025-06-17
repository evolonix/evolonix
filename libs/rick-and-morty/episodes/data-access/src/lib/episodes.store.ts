import {
  computeWith,
  initStoreState,
  SyncOptions,
  syncWithUrl,
  trackStatusWith,
  waitForAnother,
} from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  Episode,
  Pagination,
} from '@evolonix/rick-and-morty-shared-data-access';
import { EpisodesService } from './episodes.service';
import {
  EpisodeActions,
  EpisodeComputedState,
  EpisodeState,
  EpisodeViewModel,
} from './episodes.state';

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: (page = 1, query = '') => `EpisodeStore:loadAll:${page}:${query}`,
  select: (id: string) => `EpisodeStore:select:${id}`,
};

export function buildEpisodeStore(service: EpisodesService) {
  const configureStore = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => any,
    get: () => EpisodeViewModel,
    store: StoreApi<EpisodeViewModel>,
  ): EpisodeViewModel => {
    const trackStatus = trackStatusWith<EpisodeViewModel>(store);

    const state: EpisodeState = initStoreState(get, {
      episodes: [],
    });

    const actions: EpisodeActions = {
      loadAll: async (page = 1, query?: string) => {
        await trackStatus(
          async () => {
            const [episodes, info, error] = await service.getPagedEpisodes<
              Episode,
              Pagination
            >(page, query);
            return { page, query, episodes, pagination: info, error };
          },
          { waitForId: ACTIONS.loadAll(page, query) },
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

        await waitForAnother(ACTIONS.loadAll(get().page, get().query));

        const episode = get().episodes.find((s) => s.id === id);
        if (episode) {
          set({ selectedId: episode.id });
          return;
        }

        await trackStatus(
          async () => {
            const [episode, error] = await service.getEpisodeById<Episode>(id);
            return { selectedId: episode?.id, selected: episode, error };
          },
          { waitForId: ACTIONS.select(id) },
        );
      },
      save: async (episode: Episode) => {
        if (episode.id) {
          const [updated, errors] = await service.updateEpisode(episode);
          set((draft: EpisodeViewModel) => {
            draft.errors = errors ?? [];
            const index = draft.episodes.findIndex((s) => s.id === episode.id);
            if (updated && index > -1) {
              draft.episodes[index] = updated;
              draft.selectedId = updated.id;
            }
          });
        } else {
          const [created, errors] =
            await service.createEpisode<Episode>(episode);
          set((draft: EpisodeViewModel) => {
            draft.errors = errors ?? [];
            if (created) {
              draft.episodes.push(created);
              draft.selectedId = created.id;
            }
          });
        }

        return get().selected;
      },
      delete: async (id: string) => {
        const [deleted, errors] = await service.deleteEpisode(id);
        set((draft: EpisodeViewModel) => {
          draft.errors = errors ?? [];
          if (deleted) {
            draft.episodes = draft.episodes.filter((s) => s.id !== id);
            if (draft.selectedId === id) {
              draft.selectedId = undefined;
            }
          }
        });
      },
      search: async (query?: string) => {
        if (query === get().query) return;

        set({ query });

        await actions.loadAll(1, get().query);
      },
      previousPage: async () => {
        const page = get().pagination?.prev;
        if (!page) return;

        await actions.loadAll(page, get().query);
      },
      nextPage: async () => {
        const page = get().pagination?.next;
        if (!page) return;

        await actions.loadAll(page, get().query);
      },
    };

    return {
      ...state,
      ...actions,
    };
  };

  const compute = (state: EpisodeViewModel): Partial<EpisodeComputedState> => {
    const selectedId = state.selectedId;
    const selected =
      state.episodes?.find((s) => s.id === selectedId) ??
      (selectedId ? state.selected : undefined);

    return { selected };
  };

  const syncOptions: SyncOptions = {
    keys: ['page', 'query'],
    serialize: {
      page: (value: number) => (value > 1 ? String(value) : undefined),
      query: (value: string) => value || undefined,
    },
    deserialize: {
      page: (value: string) => {
        const v = parseInt(value, 10);
        return v > 0 ? v : 1;
      },
    },
  };

  const store = createStore<EpisodeViewModel>()(
    devtools(
      computeWith(compute, immer(syncWithUrl(syncOptions, configureStore))),
      {
        trace: import.meta.env.DEV,
      },
    ),
  );

  return store;
}
