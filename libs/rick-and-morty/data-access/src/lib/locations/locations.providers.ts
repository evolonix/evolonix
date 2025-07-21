import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';

import { Location } from '../models';
import { RickAndMortyApolloClient } from '../providers';
import { LocationsService } from './locations.service';

export const LocationsStoreToken = new InjectionToken('Locations Store');

export const locationsProviders: Provider[] = [
  {
    provide: LocationsService,
    useClass: LocationsService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: LocationsStoreToken,
    useFactory: buildListStore<Location>,
    deps: [LocationsService],
  },
];

addProviders(locationsProviders);
