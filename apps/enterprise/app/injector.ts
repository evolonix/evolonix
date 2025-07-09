import { DependencyInjector, EventBus, makeInjector } from '@evolonix/react';

// const buildApolloClient = (): ApolloClient<NormalizedCacheObject> => {
//   const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql',
//     cache: new InMemoryCache(),
//   });

//   return client;
// };

export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    { provide: EventBus, useFactory: () => new EventBus({ delayNotify: 10 }) },
    // {
    //   provide: ApolloClient,
    //   useFactory: buildApolloClient,
    //   deps: [],
    // },
  ]);
};
