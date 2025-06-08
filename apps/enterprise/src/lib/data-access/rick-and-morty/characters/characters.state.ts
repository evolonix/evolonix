import { StoreState, initStoreState } from '../../store.state';
import { Character } from './characters.model';
import { FilterCharacter, Info } from './graphql/__generated__/graphql';

export interface CharacterState extends StoreState {
  characters: Character[];
  page?: number;
  filter?: FilterCharacter;
  info?: Info;
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
  search: (query?: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

export type CharacterViewModel = CharacterState & CharacterComputedState & CharacterActions;

export const initCharacterState = (): CharacterState => ({
  ...initStoreState(),

  // Initial state
  characters: [],
});
