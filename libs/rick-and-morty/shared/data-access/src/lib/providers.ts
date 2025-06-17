import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { addProviders, Provider } from '@evolonix/react';

export class RickAndMortyApolloClient extends ApolloClient<NormalizedCacheObject> {}

export const buildApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return client;
};

export const providers: Provider[] = [
  {
    provide: RickAndMortyApolloClient,
    useFactory: buildApolloClient,
    deps: [],
  },
];

addProviders(providers);
