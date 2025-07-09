import { StoreState } from '@evolonix/react';

import {
  Episode,
  Pagination,
} from '@evolonix/rick-and-morty-shared-data-access';

export interface EpisodeState extends StoreState {
  episodes: Episode[];
  page?: number;
  query?: string;
  pagination?: Pagination;
  selectedId?: string;
}

export interface EpisodeComputedState {
  selected?: Episode;
}

export interface EpisodeActions {
  loadAll: (page?: number, query?: string) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (episode: Episode) => Promise<Episode | undefined>;
  delete: (id: string) => Promise<void>;
  search: (query?: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

export type EpisodeViewModel = EpisodeState &
  EpisodeComputedState &
  EpisodeActions;
