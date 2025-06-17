import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export class RickAndMortyApolloClient extends ApolloClient<NormalizedCacheObject> {}

export const buildApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  return client;
};

export const buildRickAndMortyApolloClient = (): RickAndMortyApolloClient => {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return client;
};
