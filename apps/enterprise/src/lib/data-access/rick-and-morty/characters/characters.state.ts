import { StoreState } from '@evolonix/react';

import { initStoreState } from '../../store.state';
import { Character } from './characters.model';
import { FilterCharacter, Info } from './graphql/__generated__/graphql';

export interface CharacterState {
  page: number;
  filter: FilterCharacter;
  characters: Character[];
  info: Info;
  selectedId?: string;
}

export interface CharacterComputedState {
  selected?: Character;
}

export interface CharacterActions {
  loadAll: (page?: number, filter?: FilterCharacter) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (character: Character) => Promise<Character | undefined>;
  delete: (id: string) => Promise<void>;
  search: (search: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

export type CharacterViewModel = StoreState & CharacterState & CharacterComputedState & CharacterActions;

export const initCharacterState = (): CharacterState => ({
  ...initStoreState(),

  // Initial state
  page: 1,
  filter: {},
  characters: [],
  info: {},
});

export const selectCharacterById = (id?: string) => (vm: CharacterViewModel) => {
  const found = vm.characters.find((s) => s.id === id);

  return [found ?? undefined, vm] as const;
};
