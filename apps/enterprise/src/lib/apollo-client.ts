import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export const buildApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/graphql',
    cache: new InMemoryCache(),
  });

  return client;
};
