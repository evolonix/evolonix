import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { Entity, Pagination } from './list.model';

export abstract class ListService {
  constructor(protected readonly client: ApolloClient<NormalizedCacheObject>) {}

  abstract getPagedList<T extends Entity>(
    page: number,
    query: string,
  ): Promise<[T[], Pagination, Error | undefined]>;
  abstract getEntityById<T extends Entity>(
    id: string,
  ): Promise<[T | undefined, Error | undefined]>;
  abstract updateEntity<T extends Entity>(
    entity: T,
  ): Promise<[T | undefined, Error[]]>;
  abstract createEntity<T extends Entity>(
    entity: T,
  ): Promise<[T | undefined, Error[]]>;
  abstract deleteEntity(id: string): Promise<[boolean, Error[]]>;
}
