import { buildListStore } from '@evolonix/manage-list-data-access';
import { addProviders, InjectionToken, Provider } from '@evolonix/react';
import {
  Episode,
  RickAndMortyApolloClient,
} from '@evolonix/rick-and-morty-shared-data-access';

import { EpisodesService } from './episodes.service';

export const EpisodeStoreToken = new InjectionToken('Episode Store');

export const providers: Provider[] = [
  {
    provide: EpisodesService,
    useClass: EpisodesService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: EpisodeStoreToken,
    useFactory: buildListStore<Episode>,
    deps: [EpisodesService],
  },
];

addProviders(providers);
