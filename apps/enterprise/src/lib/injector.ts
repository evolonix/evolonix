import { DependencyInjector, EventBus, makeInjector } from '@evolonix/react';

import { buildRickAndMortyApolloClient, buildStarWarsApolloClient, RickAndMortyApolloClient, StarWarsApolloClient } from './apollo-client';
import {
  buildCharacterStore,
  buildCountStore,
  buildStarshipStore,
  CharacterStoreToken,
  CountStoreToken,
  StarshipStoreToken,
} from './data-access';
import { CharactersService } from './data-access/rick-and-morty/characters/characters.service';

export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    { provide: EventBus, useFactory: () => new EventBus({ delayNotify: 10 }) },
    { provide: StarWarsApolloClient, useFactory: buildStarWarsApolloClient, deps: [] },
    { provide: RickAndMortyApolloClient, useFactory: buildRickAndMortyApolloClient, deps: [] },
    { provide: CharactersService, useClass: CharactersService, deps: [RickAndMortyApolloClient] },
    { provide: CountStoreToken, useFactory: buildCountStore, deps: [EventBus] },
    { provide: StarshipStoreToken, useFactory: buildStarshipStore, deps: [StarWarsApolloClient] },
    { provide: CharacterStoreToken, useFactory: buildCharacterStore, deps: [CharactersService] },
  ]);
};
