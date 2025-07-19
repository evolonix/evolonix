import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';
import {
  Location,
  RickAndMortyApolloClient,
} from '@evolonix/rick-and-morty-shared-data-access';

import { LocationsService } from './locations.service';

export const LocationStoreToken = new InjectionToken('Locations Store');

export const providers: Provider[] = [
  {
    provide: LocationsService,
    useClass: LocationsService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: LocationStoreToken,
    useFactory: buildListStore<Location>,
    deps: [LocationsService],
  },
];

addProviders(providers);
