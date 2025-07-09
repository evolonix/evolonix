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
  Character,
  Pagination,
} from '@evolonix/rick-and-morty-shared-data-access';
import { CharactersService } from './characters.service';
import {
  CharacterActions,
  CharacterComputedState,
  CharacterState,
  CharacterViewModel,
} from './characters.state';

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: (page = 1, query = '') => `CharacterStore:loadAll:${page}:${query}`,
  select: (id: string) => `CharacterStore:select:${id}`,
};

const initialState: Partial<CharacterState> = {
  characters: [],
  query: '',
  page: 1,
};

export function buildCharacterStore(service: CharactersService) {
  const configureStore = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => any,
    get: () => CharacterViewModel,
    store: StoreApi<CharacterViewModel>,
  ): CharacterViewModel => {
    const trackStatus = trackStatusWith<CharacterViewModel>(store);

    const state: CharacterState = initStoreState(get, initialState);

    const actions: CharacterActions = {
      loadAll: async (page = get().page ?? 1, query = get().query ?? '') => {
        await trackStatus(
          async () => {
            const [characters, info, error] = await service.getPagedCharacters<
              Character,
              Pagination
            >(page, query);
            return { page, query, characters, pagination: info, error };
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

        const character = get().characters.find((s) => s.id === id);
        if (character) {
          set({ selectedId: character.id });
          return;
        }

        await trackStatus(
          async () => {
            const [character, error] =
              await service.getCharacterById<Character>(id);
            return { selectedId: character?.id, selected: character, error };
          },
          { waitForId: ACTIONS.select(id) },
        );
      },
      save: async (character: Character) => {
        if (character.id) {
          const [updated, errors] = await service.updateCharacter(character);
          set((draft: CharacterViewModel) => {
            draft.errors = errors ?? [];
            const index = draft.characters.findIndex(
              (s) => s.id === character.id,
            );
            if (updated && index > -1) {
              draft.characters[index] = updated;
              draft.selectedId = updated.id;
            }
          });
        } else {
          const [created, errors] =
            await service.createCharacter<Character>(character);
          set((draft: CharacterViewModel) => {
            draft.errors = errors ?? [];
            if (created) {
              draft.characters.push(created);
              draft.selectedId = created.id;
            }
          });
        }

        return get().selected;
      },
      delete: async (id: string) => {
        const [deleted, errors] = await service.deleteCharacter(id);
        set((draft: CharacterViewModel) => {
          draft.errors = errors ?? [];
          if (deleted) {
            draft.characters = draft.characters.filter((s) => s.id !== id);
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
  };

  const compute = (
    state: CharacterViewModel,
  ): Partial<CharacterComputedState> => {
    const selectedId = state.selectedId;
    const selected =
      state.characters?.find((s) => s.id === selectedId) ??
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

  const store = createStore<CharacterViewModel>()(
    devtools(
      computeWith(compute, immer(syncWithUrl(syncOptions, configureStore))),
      {
        trace: import.meta.env.DEV,
      },
    ),
  );

  return store;
}
