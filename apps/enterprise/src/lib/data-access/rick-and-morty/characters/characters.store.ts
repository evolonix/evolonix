import { InjectionToken } from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';
import { computeWith } from '../../store.compute-with';
import { trackStatusWith } from '../../store.state';
import { Character } from './characters.model';
import { CharactersService } from './characters.service';
import { CharacterActions, CharacterState, CharacterViewModel, initCharacterState } from './characters.state';

export const CharacterStoreToken = new InjectionToken('Character Store');

export function buildCharacterStore(service: CharactersService) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configureStore = (set: (state: any) => any, get: () => CharacterViewModel, store: StoreApi<CharacterViewModel>) => {
    const trackStatus = trackStatusWith<CharacterViewModel>(store);

    const state: CharacterState = initCharacterState();

    const actions: CharacterActions = {
      loadAll: async (page = 1, filter = {}) => {
        await trackStatus(
          async () => {
            const [characters, info] = await service.getAllCharacters(page, filter);

            return { page, filter, characters, info };
          },
          { waitForId: 'loadCharacters', minimumWaitTime: 1000 }
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

        const character = get().characters.find((s) => s.id === id);
        if (character) {
          set((draft: CharacterViewModel) => {
            draft.selectedId = character.id;
            // return { selectedId: character.id };
          });
          return;
        }

        await trackStatus(
          async () => {
            const character = await service.getCharacterById(id);

            return { selectedId: character?.id };
          },
          { waitForId: 'selectCharacter', minimumWaitTime: 1000 }
        );
      },
      save: async (character: Character) => {
        // Here you would typically send a mutation to save the character
        // For now, we will just update the state
        set((draft: CharacterViewModel) => {
          const index = draft.characters.findIndex((s) => s.id === character.id);
          if (index !== -1) {
            draft.characters[index] = character;
          } else {
            character.id = character.id || crypto.randomUUID();
            draft.characters.push(character);
          }
          draft.selectedId = character.id;
        });

        return get().selected;
      },
      delete: async (id: string) => {
        // Here you would typically send a mutation to delete the character
        // For now, we will just update the state
        set((draft: CharacterViewModel) => {
          draft.characters = draft.characters.filter((s) => s.id !== id);
          if (draft.selectedId === id) {
            draft.selectedId = undefined;
          }
        });
      },
      search: async (query?: string) => {
        set((draft: CharacterViewModel) => {
          draft.filter.name = query;
        });
        await actions.loadAll(1, get().filter);
      },
      previousPage: async () => {
        const page = get().info.prev;
        if (!page) return;

        await actions.loadAll(page, get().filter);
      },
      nextPage: async () => {
        const page = get().info.next;
        if (!page) return;

        await actions.loadAll(page, get().filter);
      },
    };

    return {
      ...state,
      ...actions,
    } as CharacterViewModel;
  };

  const store = createStore<CharacterViewModel>()(
    devtools(
      computeWith((state) => {
        const selectedId = state.selectedId;
        const selected = state.characters?.find((s) => s.id === selectedId);

        return { selected };
      }, immer(configureStore)),
      {
        trace: true,
      }
    )
  );

  return store;
}
