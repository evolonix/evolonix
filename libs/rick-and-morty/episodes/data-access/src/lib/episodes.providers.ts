import { addProviders, InjectionToken, Provider } from '@evolonix/react';
import { RickAndMortyApolloClient } from '@evolonix/rick-and-morty-shared-data-access';
import { EpisodesService } from './episodes.service';
import { buildEpisodeStore } from './episodes.store';

export const EpisodeStoreToken = new InjectionToken('Episode Store');

export const providers: Provider[] = [
  {
    provide: EpisodesService,
    useClass: EpisodesService,
    deps: [RickAndMortyApolloClient],
  },
  {
    provide: EpisodeStoreToken,
    useFactory: buildEpisodeStore,
    deps: [EpisodesService],
  },
];

addProviders(providers);
