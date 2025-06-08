import { InjectionToken } from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { computeWith } from '../../store.compute-with';
import { trackStatusWith } from '../../store.state';
import { syncWithSearchParams } from '../../store.sync-with-search-params';
import { waitForAnother } from '../../store.utils';
import { Character } from './characters.model';
import { CharactersService } from './characters.service';
import { CharacterActions, CharacterState, CharacterViewModel, initCharacterState } from './characters.state';
import { FilterCharacter } from './graphql/__generated__/graphql';

export const CharacterStoreToken = new InjectionToken('Character Store');

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: (page = 1, filter?: FilterCharacter) => `CharacterStore:loadAll:${page}:${JSON.stringify(filter)}`,
  select: (id: string) => `CharacterStore:select:${id}`,
};

export function buildCharacterStore(service: CharactersService) {
  const configureStore = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (state: any) => any,
    get: () => CharacterViewModel,
    store: StoreApi<CharacterViewModel>
  ): CharacterViewModel => {
    const trackStatus = trackStatusWith<CharacterViewModel>(store);

    const state: CharacterState = {
      ...initCharacterState(),
      ...get(), // Include any existing state initialized by middleware
    };

    const actions: CharacterActions = {
      loadAll: async (page = get().page, filter = get().filter) => {
        await trackStatus(
          async () => {
            const [characters, info] = await service.getAllCharacters(page, filter);
            return { page, filter, characters, info };
          },
          { waitForId: ACTIONS.loadAll(page, filter) }
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

        await waitForAnother(ACTIONS.loadAll(get().page, get().filter));

        const character = get().characters.find((s) => s.id === id);
        if (character) {
          set({ selectedId: character.id });
          return;
        }

        await trackStatus(
          async () => {
            const [character] = await service.getCharacterById(id);
            return { selectedId: character?.id };
          },
          { waitForId: ACTIONS.select(id) }
        );
      },
      save: async (character: Character) => {
        if (character.id) {
          const [updated] = await service.update(character);
          set((draft: CharacterViewModel) => {
            const index = draft.characters.findIndex((s) => s.id === character.id);
            if (updated && index > -1) draft.characters[index] = updated;
            draft.selectedId = character.id;
          });
        } else {
          const [created] = await service.create(character);
          set((draft: CharacterViewModel) => {
            if (created) draft.characters.push(created);
            draft.selectedId = character.id;
          });
        }

        return get().selected;
      },
      delete: async (id: string) => {
        const [deleted] = await service.delete(id);
        set((draft: CharacterViewModel) => {
          if (deleted) {
            draft.characters = draft.characters.filter((s) => s.id !== id);
            if (draft.selectedId === id) {
              draft.selectedId = undefined;
            }
          }
        });
      },
      search: async (query?: string) => {
        set((draft: CharacterViewModel) => {
          if (!draft.filter) draft.filter = {};

          draft.filter.name = query;
        });
        await actions.loadAll(1);
      },
      previousPage: async () => {
        const page = get().info?.prev;
        if (!page) return;

        await actions.loadAll(page);
      },
      nextPage: async () => {
        const page = get().info?.next;
        if (!page) return;

        await actions.loadAll(page);
      },
    };

    return {
      ...state,
      ...actions,
    };
  };

  const compute = (state: CharacterViewModel): Partial<CharacterViewModel> => {
    const selectedId = state.selectedId;
    const selected = state.characters?.find((s) => s.id === selectedId) ?? state.selected;

    return { selected };
  };

  const syncOptions = {
    keys: ['page', 'filter.name'],
    serialize: {
      page: (value: number) => (value > 1 ? String(value) : undefined),
      'filter.name': (value: string) => value || undefined,
    },
    deserialize: {
      page: (value: string) => parseInt(value, 10),
    },
  };

  const store = createStore<CharacterViewModel>()(
    devtools(computeWith(compute, immer(syncWithSearchParams(syncOptions, configureStore))), {
      trace: import.meta.env.DEV,
    })
  );

  return store;
}
