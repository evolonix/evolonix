import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';
import {
  Character,
  RickAndMortyApolloClient,
} from '@evolonix/rick-and-morty-shared-data-access';

import { CharactersService } from './characters.service';

export const CharacterStoreToken = new InjectionToken('Characters Store');

export const providers: Provider[] = [
  {
    provide: CharactersService,
    useClass: CharactersService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: CharacterStoreToken,
    useFactory: buildListStore<Character>,
    deps: [CharactersService],
  },
];

addProviders(providers);
