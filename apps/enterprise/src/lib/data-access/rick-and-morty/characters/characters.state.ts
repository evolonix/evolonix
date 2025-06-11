import { StoreState } from '../../../rsm/store.state';
import { Character, FilterCharacter, Pagination } from './characters.model';

export interface CharacterState extends StoreState {
  characters: Character[];
  page?: number;
  filter?: FilterCharacter;
  pagination?: Pagination;
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
