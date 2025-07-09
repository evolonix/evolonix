import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['libs/rick-and-morty/characters/data-access/src/**/*.graphql'],
  generates: {
    'libs/rick-and-morty/characters/data-access/src/lib/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
