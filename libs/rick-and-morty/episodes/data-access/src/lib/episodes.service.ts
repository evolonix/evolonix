import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  EpisodeByIdDocument,
  EpisodesDocument,
} from './__generated__/operations';

export class EpisodesService {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  async getPagedEpisodes<T, F>(
    page?: number,
    query?: string,
  ): Promise<[T[], F, Error | undefined]> {
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

    const episodes = (data.episodes?.results ?? []) as T[];
    const info = (data.episodes?.info || {}) as F;

    return [episodes, info, error];
  }

  async getEpisodeById<T>(
    id: string,
  ): Promise<[T | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: EpisodeByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const episode = data.episode as T | undefined;
    return [episode, error];
  }

  async createEpisode<T>(
    episode: Omit<T, 'id'>,
  ): Promise<[T | undefined, Error[] | undefined]> {
    // const { data, errors } = await this.client.mutate({
    //   mutation: CreateEpisodeDocument,
    //   variables: { episode },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.episode.create as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [created, errorList];

    const created = { ...episode, id: crypto.randomUUID() } as T;
    return [created, undefined];
  }

  async updateEpisode<T>(
    episode: T,
  ): Promise<[T | undefined, Error[] | undefined]> {
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
    return [updated, undefined];
  }

  async deleteEpisode(id: string): Promise<[boolean, Error[] | undefined]> {
    // const { errors } = await this.client.mutate({
    //   mutation: DeleteEpisodeDocument,
    //   variables: { id },
    //   fetchPolicy: 'no-cache',
    // });
    // const deleted = errors === undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [deleted, errorList];

    const deleted = id !== '';
    return [deleted, undefined];
  }
}
