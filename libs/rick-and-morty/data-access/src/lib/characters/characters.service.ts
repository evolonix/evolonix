import {
  ListService,
  PaginationDetails,
} from '@evolonix/manage-list-data-access';
import {
  CharacterByIdDocument,
  CharactersDocument,
} from '../__generated__/graphql';

export class CharactersService extends ListService {
  async getList<Character>(
    query: string,
  ): Promise<[Character[], Error | undefined]> {
    const { data, error } = await this.client.query({
      query: CharactersDocument,
      variables: {
        page: 1,
        filter: {
          name: query,
        },
      },
      fetchPolicy: 'no-cache',
    });

    const characters = (data.characters?.results ?? []) as Character[];

    // const info = (data.characters?.info || {}) as PaginationDetails;
    // const promises: Promise<void>[] = [];
    // if (info.pages) {
    //   for (let i = 2; i <= info.pages; i++) {
    //     const promise = this.client
    //       .query({
    //         query: CharactersDocument,
    //         variables: {
    //           page: i,
    //           filter: {
    //             name: query,
    //           },
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //       .then(({ data: pageData }) => {
    //         const moreCharacters = (pageData.characters?.results ??
    //           []) as Character[];
    //         characters.push(...moreCharacters);
    //       });
    //     promises.push(promise);
    //   }
    // }
    // await Promise.all(promises);

    return [characters, error];
  }

  async getPagedList<Character>(
    page: number,
    query: string,
  ): Promise<[Character[], PaginationDetails, Error | undefined]> {
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

    // // For testing purposes, we can use a mock data file
    // const { data } = JSON.parse(mockCharacters);
    // const error = undefined; // Simulating no error for mock data

    const characters = (data.characters?.results ?? []) as Character[];
    const info = (data.characters?.info || {}) as PaginationDetails;

    return [characters, info, error];
  }

  async getEntityById<Character>(
    id: string,
  ): Promise<[Character | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: CharacterByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const character = data.character as Character | undefined;
    return [character, error];
  }

  async createEntity<Character>(
    character: Omit<Character, 'id'>,
  ): Promise<[Character | undefined, Error[]]> {
    // const { data, errors } = await this.client.mutate({
    //   mutation: CreateCharacterDocument,
    //   variables: { character },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.character.create as T | undefined;
    // const errorList = errors ? errors.map(e => new Error(e.message)) : undefined;
    // return [created, errorList];

    const created = { ...character, id: crypto.randomUUID() } as Character;
    return [created, []];
  }

  async updateEntity<Character>(
    character: Character,
  ): Promise<[Character | undefined, Error[]]> {
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
    return [updated, []];
  }

  async deleteEntity(id: string): Promise<[boolean, Error[]]> {
    // const { errors } = await this.client.mutate({
    //   mutation: DeleteCharacterDocument,
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
