import { RickAndMortyApolloClient } from '../../../apollo-client';
import { Character } from './characters.model';
import { FilterCharacter, GetAllCharactersDocument, GetCharacterByIdDocument, Info } from './graphql/__generated__/graphql';

export class CharactersService {
  constructor(private readonly client: RickAndMortyApolloClient) {}

  async getAllCharacters(page?: number, filter?: FilterCharacter): Promise<[Character[], Info]> {
    const { data } = await this.client.query({
      query: GetAllCharactersDocument,
      variables: {
        page: page,
        filter: filter,
      },
      fetchPolicy: 'no-cache',
    });

    const characters = (data.characters?.results ?? []) as Character[];
    const info = (data.characters?.info || {}) as Info;

    return [characters, info];
  }

  async getCharacterById(id: string): Promise<Character | undefined> {
    const { data } = await this.client.query({
      query: GetCharacterByIdDocument,
      variables: { id },
    });
    return data.character as Character | undefined;
  }

  async create(character: Omit<Character, 'id'>): Promise<void> {
    // return this.client.save(character);
  }

  async update(character: Character): Promise<void> {
    // return this.client.save(character);
  }

  async delete(id: string): Promise<void> {
    // return this.client.delete(id);
  }
}
