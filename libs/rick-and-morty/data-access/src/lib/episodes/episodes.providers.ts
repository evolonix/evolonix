import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';

import { Episode } from '../models';
import { RickAndMortyApolloClient } from '../providers';

import { EpisodesService } from './episodes.service';

export const EpisodesStoreToken = new InjectionToken('Episodes Store');

export const episodesProviders: Provider[] = [
  {
    provide: EpisodesService,
    useClass: EpisodesService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: EpisodesStoreToken,
    useFactory: buildListStore<Episode>,
    deps: [EpisodesService],
  },
];

addProviders(episodesProviders);
