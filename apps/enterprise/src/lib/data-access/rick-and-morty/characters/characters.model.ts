import { Character as ExternalCharacter } from './graphql/__generated__/graphql';

export type Character = Omit<ExternalCharacter, '__typename' | 'id' | 'episode'> & {
  id?: string;
};
