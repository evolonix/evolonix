import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { InjectionToken } from '@evolonix/react';
import { createStore, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { computedWith } from '../../store.computed';
import { trackStatusWith } from '../../store.state';
import { GetAllStarshipsDocument, GetStarshipByIdDocument } from './graphql/__generated__/graphql';
import { Starship } from './starships.model';
import { initStarshipState, QueryOptions, StarshipActions, StarshipState, StarshipViewModel } from './starships.state';

export const StarshipStoreToken = new InjectionToken('Starship Store');

export function buildStarshipStore(client: ApolloClient<NormalizedCacheObject>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configureStore = (set: (state: any) => any, get: () => StarshipViewModel, store: StoreApi<StarshipViewModel>) => {
    const trackStatus = trackStatusWith<StarshipViewModel>(store);

    const state: StarshipState = initStarshipState();

    const actions: StarshipActions = {
      loadAll: async (options: QueryOptions = {}) => {
        await trackStatus(
          async () => {
            const results = await client.query({
              query: GetAllStarshipsDocument,
              variables: options.pagination?.previous
                ? { last: options.pagination.take, before: options.pagination.previous }
                : { first: options.pagination?.take, after: options.pagination?.next },
              fetchPolicy: 'no-cache',
            });
            // Mimic server-side search
            let starships = (results.data.allStarships?.starships as Starship[]) || [];
            if (options.search) {
              const searchLower = options.search.toLowerCase();
              starships = starships.filter((s) => s.name?.toLowerCase().includes(searchLower));
            }

            const starshipsPageInfo = results.data.allStarships?.pageInfo;

            return { options, starships, pageInfo: starshipsPageInfo };
          },
          { waitForId: 'loadStarships', minimumWaitTime: 1000 }
        );
      },
      select: async (id?: string) => {
        if (!id) {
          set({ selectedId: undefined });
          return;
        }

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
            const starship = results.data.starship as Starship;

            return { selectedId: starship.id };
          },
          { waitForId: 'selectStarship', minimumWaitTime: 1000 }
        );
      },
      save: async (starship: Starship) => {
        // Here you would typically send a mutation to save the starship
        // For now, we will just update the state directly
        set((draft: StarshipViewModel) => {
          const index = draft.starships.findIndex((s) => s.id === starship.id);
          if (index !== -1) {
            draft.starships[index] = starship;
          } else {
            starship.id = starship.id || crypto.randomUUID();
            draft.starships.push(starship);
          }
          draft.selectedId = starship.id;
        });

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
      search: async (search: string) => {
        set((draft: StarshipViewModel) => {
          draft.options.search = search;
          if (draft.options.pagination) {
            draft.options.pagination.previous = undefined;
            draft.options.pagination.next = undefined;
          }
        });
        await actions.loadAll(get().options);
      },
      nextPage: async () => {
        const nextPageInfo = get().pageInfo.endCursor;
        if (!nextPageInfo) return;

        set((draft: StarshipViewModel) => {
          if (draft.options.pagination) {
            draft.options.pagination.previous = undefined;
            draft.options.pagination.next = nextPageInfo;
          }
        });
        await actions.loadAll(get().options);
      },
      previousPage: async () => {
        const previousPageInfo = get().pageInfo.startCursor;
        if (!previousPageInfo) return;

        set((draft: StarshipViewModel) => {
          if (draft.options.pagination) {
            draft.options.pagination.previous = previousPageInfo;
            draft.options.pagination.next = undefined;
          }
        });
        await actions.loadAll(get().options);
      },
    };

    return {
      ...state,
      ...actions,
    } as StarshipViewModel;
  };

  const computed = computedWith<StarshipViewModel>((state) => {
    const selectedId = state.selectedId;
    const selected = state.starships?.find((s) => s.id === selectedId);

    return { selected };
  });

  const store = createStore<StarshipViewModel>()(
    devtools(immer(computed(configureStore)), {
      trace: true,
    })
  );

  return store;
}
