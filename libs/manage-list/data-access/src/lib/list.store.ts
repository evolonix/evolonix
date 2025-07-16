import {
  computeWith,
  initStoreState,
  SyncOptions,
  syncWithUrl,
  trackStatusWith,
  waitForAnother,
} from '@evolonix/react';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Entity } from './list.model';
import { ListService } from './list.service';
import {
  ListActions,
  ListComputedState,
  ListState,
  ListViewModel,
} from './list.state';

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: (page = 1, query = '') => `ListStore:loadAll:${page}:${query}`,
  select: (id: string) => `ListStore:select:${id}`,
};

export function buildListStore<T extends Entity>(service: ListService) {
  function configureStore<T extends Entity>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => any,
    get: () => ListViewModel<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: any, // StoreApi<ListViewModel<T>>,
  ): ListViewModel<T> {
    const trackStatus = trackStatusWith<ListViewModel<T>>(store);

    const initialState: Partial<ListState<T>> = {
      list: [],
      query: '',
      page: 1,
    };

    const state: ListState<T> = initStoreState(get, initialState);

    const actions: ListActions<T> = {
      loadAll: async (page = get().page ?? 1, query = get().query ?? '') => {
        await trackStatus(
          async () => {
            const [list, info, error] = await service.getPagedList<T>(
              page,
              query,
            );
            return { page, query, list, pagination: info, error };
          },
          { waitForId: ACTIONS.loadAll(page, query) },
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

        if (id === get().selectedId) {
          return; // already selected
        }

        await waitForAnother(ACTIONS.loadAll(get().page, get().query));

        const entity = get().list.find((s) => s.id === id);
        if (entity) {
          set({ selectedId: entity.id });
          return;
        }

        await trackStatus(
          async () => {
            const [entity, error] = await service.getEntityById<T>(id);
            return { selectedId: entity?.id, selected: entity, error };
          },
          { waitForId: ACTIONS.select(id) },
        );
      },
      save: async (entity: T) => {
        if (entity.id) {
          const [updated, errors] = await service.updateEntity(entity);
          set((draft: ListViewModel<T>) => {
            draft.errors = errors ?? [];
            const index = draft.list.findIndex((s) => s.id === entity.id);
            if (updated && index > -1) {
              draft.list[index] = updated;
              draft.selectedId = updated.id;
            }
          });
        } else {
          const [created, errors] = await service.createEntity(entity);
          set((draft: ListViewModel<T>) => {
            draft.errors = errors ?? [];
            if (created) {
              draft.list.push(created);
              draft.selectedId = created.id;
            }
          });
        }

        return get().selected;
      },
      delete: async (id: string) => {
        const [deleted, errors] = await service.deleteEntity(id);
        set((draft: ListViewModel<T>) => {
          draft.errors = errors ?? [];
          if (deleted) {
            draft.list = draft.list.filter((s) => s.id !== id);
            if (draft.selectedId === id) {
              draft.selectedId = undefined;
            }
          }
        });
      },
      search: async (query = '') => {
        if (query === get().query) return;

        await actions.loadAll(1, query);
      },
      previousPage: async () => {
        const page = get().pagination?.prev;
        if (!page) return;

        await actions.loadAll(page);
      },
      nextPage: async () => {
        const page = get().pagination?.next;
        if (!page) return;

        await actions.loadAll(page);
      },
      reset: () => set(initialState),
    };

    return {
      ...state,
      ...actions,
    };
  }

  const compute = (state: ListViewModel<T>): Partial<ListComputedState<T>> => {
    const selectedId = state.selectedId;
    const selected =
      state.list?.find((s) => s.id === selectedId) ??
      (selectedId ? state.selected : undefined);

    return { selected };
  };

  const syncOptions: SyncOptions = {
    keys: ['page', { stateKey: 'query', urlKey: 'q' }],
    serialize: {
      page: (value: number) => (value > 1 ? String(value) : undefined),
      query: (value: string) => value || undefined,
    },
    deserialize: {
      page: (value?: string) => {
        const v = value ? parseInt(value, 10) : 1;
        return v > 0 ? v : 1;
      },
      q: (value?: string) => value ?? '',
    },
  };

  const store = createStore<ListViewModel<T>>()(
    devtools(
      computeWith(compute, syncWithUrl(syncOptions, immer(configureStore<T>))),
    ),
  );

  return store;
}
