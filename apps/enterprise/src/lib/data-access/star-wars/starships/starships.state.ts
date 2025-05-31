import { StoreState } from '@evolonix/react';

import { initStoreState } from '../../store.state';
import { PageInfo } from './graphql/__generated__/graphql';
import { Starship } from './starships.model';

export interface QueryOptions {
  search?: string;
  pagination?: {
    take?: number;
    previous?: string | null;
    next?: string | null;
  };
}

export interface StarshipState {
  options: QueryOptions;
  starships: Starship[];
  pageInfo: PageInfo;
  selectedId?: string;
}

export interface StarshipComputedState {
  selected?: Starship;
}

export interface StarshipActions {
  loadAll: (options?: QueryOptions) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (starship: Starship) => Promise<Starship | undefined>;
  delete: (id: string) => Promise<void>;
  search: (search: string) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
}

export type StarshipViewModel = StoreState & StarshipState & StarshipComputedState & StarshipActions;

export const initStarshipState = (): StarshipState => ({
  ...initStoreState(),

  // Initial state
  options: { pagination: { take: 20 } },
  starships: [],
  pageInfo: {
    startCursor: undefined,
    endCursor: undefined,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});

export const selectStarshipById = (id?: string) => (vm: StarshipViewModel) => {
  const found = vm.starships.find((s) => s.id === id);

  return [found ?? undefined, vm] as const;
};
