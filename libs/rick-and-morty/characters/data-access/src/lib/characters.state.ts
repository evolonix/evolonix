import { StoreState } from '@evolonix/react';

import {
  Character,
  Pagination,
} from '@evolonix/rick-and-morty-shared-data-access';

export interface CharacterState extends StoreState {
  characters: Character[];
  page?: number;
  query?: string;
  pagination?: Pagination;
  selectedId?: string;
}

export interface CharacterComputedState {
  selected?: Character;
}

export interface CharacterActions {
  loadAll: (page?: number, query?: string) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (character: Character) => Promise<Character | undefined>;
  delete: (id: string) => Promise<void>;
  search: (query?: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

export type CharacterViewModel = CharacterState &
  CharacterComputedState &
  CharacterActions;
