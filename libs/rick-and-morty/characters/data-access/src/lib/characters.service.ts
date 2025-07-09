import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CharacterByIdDocument,
  CharactersDocument,
} from './__generated__/graphql';

export class CharactersService {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  async getPagedCharacters<T, F>(
    page?: number,
    query?: string,
  ): Promise<[T[], F, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: CharactersDocument,
      variables: {
        page: page,
        filter: {
          name: query,
        },
      },
      fetchPolicy: 'no-cache',
    });

    const characters = (data.characters?.results ?? []) as T[];
    const info = (data.characters?.info || {}) as F;

    return [characters, info, error];
  }

  async getCharacterById<T>(
    id: string,
  ): Promise<[T | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: CharacterByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const character = data.character as T | undefined;
    return [character, error];
  }

  async createCharacter<T>(
    character: Omit<T, 'id'>,
  ): Promise<[T | undefined, Error[] | undefined]> {
    // const { data, errors } = await this.client.mutate({
    //   mutation: CreateCharacterDocument,
    //   variables: { character },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.character.create as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [created, errorList];

    const created = { ...character, id: crypto.randomUUID() } as T;
    return [created, undefined];
  }

  async updateCharacter<T>(
    character: T,
  ): Promise<[T | undefined, Error[] | undefined]> {
    // const { __typename, ...payload } = track as Character;
    // const { data, errors } = await this.client.mutate({
    //   mutation: UpdateCharacterDocument,
    //   variables: { character: payload },
    //   fetchPolicy: 'no-cache',
    // });
    // const updated = data.character.update as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [updated, errorList];

    const updated = { ...character };
    return [updated, undefined];
  }

  async deleteCharacter(id: string): Promise<[boolean, Error[] | undefined]> {
    // const { errors } = await this.client.mutate({
    //   mutation: DeleteCharacterDocument,
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
