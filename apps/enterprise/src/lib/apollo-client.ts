import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export class StarWarsApolloClient extends ApolloClient<NormalizedCacheObject> {}
export class RickAndMortyApolloClient extends ApolloClient<NormalizedCacheObject> {}

export const buildStarWarsApolloClient = (): StarWarsApolloClient => {
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/graphql',
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
