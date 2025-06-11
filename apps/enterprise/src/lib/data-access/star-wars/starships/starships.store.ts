import { InjectionToken } from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { StarWarsApolloClient } from '../../../apollo-client';
import { computeWith } from '../../../rsm';
import { trackStatusWith } from '../../../rsm/store.state';
import { waitForAnother } from '../../../rsm/store.utils';
import { GetAllStarshipsDocument, GetStarshipByIdDocument } from './graphql/__generated__/graphql';
import { Starship } from './starships.model';
import { initStarshipState, StarshipActions, StarshipComputedState, StarshipState, StarshipViewModel } from './starships.state';

export const StarshipStoreToken = new InjectionToken('Starship Store');

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: () => 'CharacterStore:loadAll',
  select: (id: string) => `CharacterStore:select:${id}`,
};

export function buildStarshipStore(client: StarWarsApolloClient) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configureStore = (set: (state: any) => any, get: () => StarshipViewModel, store: StoreApi<StarshipViewModel>) => {
    const trackStatus = trackStatusWith<StarshipViewModel>(store);

    const state: StarshipState = initStarshipState();

    const actions: StarshipActions = {
      loadAll: async () => {
        await trackStatus(
          async () => {
            const results = await client.query({
              query: GetAllStarshipsDocument,
              fetchPolicy: 'no-cache',
            });
            const starships = (results.data.allStarships?.starships || []) as Starship[];

            return { starships };
          },
          { waitForId: ACTIONS.loadAll(), minimumWaitTime: 1000 }
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

        await waitForAnother(ACTIONS.loadAll());

        const starship = get().starships.find((s) => s.id === id);
        if (starship) {
          set({ selectedId: starship.id });
          return;
        }

        await trackStatus(
          async () => {
            const results = await client.query({
              query: GetStarshipByIdDocument,
              variables: { id },
              fetchPolicy: 'no-cache',
            });
            const starship = results.data.starship;

            return { selectedId: starship?.id };
          },
          { waitForId: ACTIONS.select(id), minimumWaitTime: 1000 }
        );
      },
      save: async (starship: Starship) => {
        // Here you would typically send a mutation to save the starship
        // For now, we will just update the state directly
        if (starship.id) {
          const [updated] = [starship];
          set((draft: StarshipViewModel) => {
            const index = draft.starships.findIndex((s) => s.id === starship.id);
            if (updated && index > -1) {
              draft.starships[index] = updated;
              draft.selectedId = updated.id;
            }
          });
        } else {
          const [created] = [starship];
          set((draft: StarshipViewModel) => {
            if (created) {
              draft.starships.push(created);
              draft.selectedId = created.id;
            }
          });
        }

        return get().selected;
      },
      delete: async (id: string) => {
        // Here you would typically send a mutation to delete the starship
        // For now, we will just update the state directly
        set((draft: StarshipViewModel) => {
          draft.starships = draft.starships.filter((s) => s.id !== id);
          if (draft.selectedId === id) {
            draft.selectedId = undefined;
          }
        });
      },
    };

    return {
      ...state,
      ...actions,
    } as StarshipViewModel;
  };

  const compute = (state: StarshipViewModel): Partial<StarshipComputedState> => {
    const selectedId = state.selectedId;
    const selected = state.starships?.find((s) => s.id === selectedId) ?? (selectedId ? state.selected : undefined);

    return { selected };
  };

  const store = createStore<StarshipViewModel>()(
    devtools(computeWith(compute, immer(configureStore)), {
      trace: true,
    })
  );

  return store;
}
