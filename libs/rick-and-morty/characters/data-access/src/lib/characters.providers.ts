import { addProviders, InjectionToken, Provider } from '@evolonix/react';
import { RickAndMortyApolloClient } from '@evolonix/rick-and-morty-shared-data-access';
import { CharactersService } from './characters.service';
import { buildCharacterStore } from './characters.store';

export const CharacterStoreToken = new InjectionToken('Character Store');

export const providers: Provider[] = [
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
];

addProviders(providers);
