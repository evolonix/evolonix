import { StoreState } from '@evolonix/react';

import {
  Character,
  Pagination,
} from '@evolonix/rick-and-morty-shared-data-access';

export interface CharacterState extends StoreState {
  characters: Character[];
  query: string;
  page?: number;
  pagination?: Pagination;
  selectedId?: string;
}

export interface CharacterComputedState {
  selected?: Character;
}

export interface CharacterActions {
  loadAll: (page?: number, query?: string, replace?: boolean) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (character: Character) => Promise<Character | undefined>;
  delete: (id: string) => Promise<void>;
  search: (query?: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  reset: () => void;
}

export type CharacterViewModel = CharacterState &
  CharacterComputedState &
  CharacterActions;
