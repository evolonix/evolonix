import { Starship as ExternalStarship } from './graphql/__generated__/graphql';

export type Starship = Omit<ExternalStarship, 'id'> & {
  id?: string;
};
