import { ApolloClient } from '@apollo/client';
import { DependencyInjector, EventBus, makeInjector } from '@evolonix/react';

import {
  buildCharacterStore,
  CharactersService,
  CharacterStoreToken,
} from '@evolonix/rick-and-morty-data-access-characters';
import {
  buildApolloClient,
  buildRickAndMortyApolloClient,
  RickAndMortyApolloClient,
} from './apollo-clients';

export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    { provide: EventBus, useFactory: () => new EventBus({ delayNotify: 10 }) },
    {
      provide: ApolloClient,
      useFactory: buildApolloClient,
      deps: [],
    },
    {
      provide: RickAndMortyApolloClient,
      useFactory: buildRickAndMortyApolloClient,
      deps: [],
    },
    {
      provide: CharactersService,
      useClass: CharactersService,
      deps: [RickAndMortyApolloClient],
    },
    {
      provide: CharacterStoreToken,
      useFactory: buildCharacterStore,
      deps: [CharactersService],
    },
  ]);
};
