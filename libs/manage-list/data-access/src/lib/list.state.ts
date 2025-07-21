import { StoreState } from '@evolonix/react';

import { Entity, PaginationDetails } from './list.model';

export interface ListState<T extends Entity> extends StoreState {
  list: T[];
  query: string;
  page?: number;
  pagination?: PaginationDetails;
  selectedId?: string;
}

export interface ListComputedState<T extends Entity> {
  selected?: T;
}

export interface ListActions<T extends Entity> {
  loadAll: (query?: string) => Promise<void>;
  loadPaged: (
    page?: number,
    query?: string,
    replace?: boolean,
  ) => Promise<void>;
  select: (id?: string) => Promise<void>;
  save: (entity: T) => Promise<T | undefined>;
  delete: (id: string) => Promise<void>;
  search: (query?: string) => Promise<void>;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  reset: () => void;
}

export type ListViewModel<T extends Entity> = ListState<T> &
  ListComputedState<T> &
  ListActions<T>;
