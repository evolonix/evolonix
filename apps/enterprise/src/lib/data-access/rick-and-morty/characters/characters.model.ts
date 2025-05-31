import { Character as ExternalCharacter } from './graphql/__generated__/graphql';

export type Character = Omit<ExternalCharacter, 'id' | 'episode'> & {
  id?: string;
};
