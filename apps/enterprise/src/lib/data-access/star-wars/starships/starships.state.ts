import { initStoreState, StoreState } from '../../../rsm/store.state';
import { Starship } from './starships.model';

export interface StarshipState extends StoreState {
  starships: Starship[];
  selectedId?: string;
}

export interface StarshipComputedState {
  selected?: Starship;
}

export interface StarshipActions {
  loadAll: () => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (starship: Starship) => Promise<Starship | undefined>;
  delete: (id: string) => Promise<void>;
}

export type StarshipViewModel = StarshipState & StarshipComputedState & StarshipActions;

export const initStarshipState = (): StarshipState => ({
  ...initStoreState(),

  // Initial state
  starships: [],
});

export const selectStarshipById = (id?: string) => (vm: StarshipViewModel) => {
  const found = vm.starships.find((s) => s.id === id);

  return [found ?? undefined, vm] as const;
};
