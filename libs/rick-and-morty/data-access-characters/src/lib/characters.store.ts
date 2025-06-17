import {
  computeWith,
  initStoreState,
  InjectionToken,
  SyncOptions,
  syncWithUrl,
  trackStatusWith,
  waitForAnother,
} from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Character, Pagination } from './characters.model';
import { CharactersService } from './characters.service';
import {
  CharacterActions,
  CharacterComputedState,
  CharacterState,
  CharacterViewModel,
} from './characters.state';

export const CharacterStoreToken = new InjectionToken('Character Store');

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: (page = 1, query = '') => `CharacterStore:loadAll:${page}:${query}`,
  select: (id: string) => `CharacterStore:select:${id}`,
};

export function buildCharacterStore(service: CharactersService) {
  const configureStore = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => any,
    get: () => CharacterViewModel,
    store: StoreApi<CharacterViewModel>,
  ): CharacterViewModel => {
    const trackStatus = trackStatusWith<CharacterViewModel>(store);

    // const state: CharacterState = initStoreState<CharacterState>(get, {
    //   characters: [],
    // });
    const state: CharacterState = initStoreState(get);

    const actions: CharacterActions = {
      loadAll: async (page = get().page, query = get().query) => {
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
      search: async (query?: string) => {
        if (query === get().query) return;

        set((draft: CharacterViewModel) => {
          draft.query = query;

          if (!query) draft.page = 1;
        });

        await actions.loadAll();
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
    keys: ['page', { stateKey: 'filter.name', urlKey: 'search' }],
    serialize: {
      page: (value: number) => (value > 1 ? String(value) : undefined),
      'filter.name': (value: string) => value || undefined,
    },
    deserialize: {
      page: (value: string) => {
        const v = parseInt(value, 10);
        return v > 0 ? v : 1;
      },
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
