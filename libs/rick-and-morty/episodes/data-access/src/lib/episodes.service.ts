import {
  ListService,
  PaginationDetails,
} from '@evolonix/manage-list-data-access';
import { EpisodeByIdDocument, EpisodesDocument } from './__generated__/graphql';

export class EpisodesService extends ListService {
  async getPagedList<Episode>(
    page: number,
    query: string,
  ): Promise<[Episode[], PaginationDetails, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: EpisodesDocument,
      variables: {
        page: page,
        filter: {
          name: query,
        },
      },
      fetchPolicy: 'no-cache',
    });

    // // For testing purposes, we can use a mock data file
    // const { data } = JSON.parse(mockEpisodes);
    // const error = undefined; // Simulating no error for mock data

    const episodes = (data.episodes?.results ?? []) as Episode[];
    const info = (data.episodes?.info || {}) as PaginationDetails;

    return [episodes, info, error];
  }

  async getEntityById<Episode>(
    id: string,
  ): Promise<[Episode | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: EpisodeByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const episode = data.episode as Episode | undefined;
    return [episode, error];
  }

  async createEntity<Episode>(
    episode: Omit<Episode, 'id'>,
  ): Promise<[Episode | undefined, Error[]]> {
    // const { data, errors } = await this.client.mutate({
    //   mutation: CreateEpisodeDocument,
    //   variables: { episode },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.episode.create as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [created, errorList];

    const created = { ...episode, id: crypto.randomUUID() } as Episode;
    return [created, []];
  }

  async updateEntity<Episode>(
    episode: Episode,
  ): Promise<[Episode | undefined, Error[]]> {
    // const { __typename, ...payload } = track as Episode;
    // const { data, errors } = await this.client.mutate({
    //   mutation: UpdateEpisodeDocument,
    //   variables: { episode: payload },
    //   fetchPolicy: 'no-cache',
    // });
    // const updated = data.episode.update as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [updated, errorList];

    const updated = { ...episode };
    return [updated, []];
  }

  async deleteEntity(id: string): Promise<[boolean, Error[]]> {
    // const { errors } = await this.client.mutate({
    //   mutation: DeleteEpisodeDocument,
    //   variables: { id },
    //   fetchPolicy: 'no-cache',
    // });
    // const deleted = errors === undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [deleted, errorList];

    const deleted = id !== '';
    return [deleted, []];
  }
}
