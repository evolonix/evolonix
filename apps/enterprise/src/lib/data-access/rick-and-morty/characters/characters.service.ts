import { RickAndMortyApolloClient } from '../../../apollo-client';
import { Character } from './characters.model';
import { FilterCharacter, GetAllCharactersDocument, GetCharacterByIdDocument, Info } from './graphql/__generated__/graphql';

export class CharactersService {
  constructor(private readonly client: RickAndMortyApolloClient) {}

  async getAllCharacters(page?: number, filter?: FilterCharacter): Promise<[Character[], Info, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: GetAllCharactersDocument,
      variables: {
        page: page,
        filter: filter,
      },
      fetchPolicy: 'no-cache',
    });

    const characters = (data.characters?.results ?? []) as Character[];
    const info = (data.characters?.info || {}) as Info;

    return [characters, info, error];
  }

  async getCharacterById(id: string): Promise<[Character | undefined, Error | undefined]> {
    const { data, error } = await this.client.query({
      query: GetCharacterByIdDocument,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    const character = data.character as Character | undefined;
    return [character, error];
  }

  async create(character: Omit<Character, 'id'>): Promise<[Character | undefined, Error | undefined]> {
    // const { data, error } = await this.client.mutate({
    //   mutation: CreateCharacterDocument,
    //   variables: { character },
    //   fetchPolicy: 'no-cache',
    // });
    // const created = data.character as Character | undefined;
    // return [created, error];

    const created = { ...character, id: crypto.randomUUID() } as Character;
    return [created, undefined];
  }

  async update(character: Character): Promise<[Character | undefined, Error | undefined]> {
    // const { data, error } = await this.client.mutate({
    //   mutation: UpdateCharacterDocument,
    //   variables: { character },
    //   fetchPolicy: 'no-cache',
    // });
    // const updated = data.character as Character | undefined;
    // return [updated, error];

    const updated = { ...character };
    return [updated, undefined];
  }

  async delete(id: string): Promise<[boolean, Error | undefined]> {
    // const { error } = await this.client.mutate({
    //   mutation: DeleteCharacterDocument,
    //   variables: { id },
    //   fetchPolicy: 'no-cache',
    // });
    // const deleted = error === undefined;
    // return [deleted, error];

    const deleted = id !== '';
    return [deleted, undefined];
  }
}
