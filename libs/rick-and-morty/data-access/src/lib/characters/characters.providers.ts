import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';

import { Character } from '../models';
import { RickAndMortyApolloClient } from '../providers';
import { CharactersService } from './characters.service';

export const CharactersStoreToken = new InjectionToken('Characters Store');

export const charactersProviders: Provider[] = [
  {
    provide: CharactersService,
    useClass: CharactersService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: CharactersStoreToken,
    useFactory: buildListStore<Character>,
    deps: [CharactersService],
  },
];

addProviders(charactersProviders);
