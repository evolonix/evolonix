import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['libs/rick-and-morty/episodes/data-access/src/**/*.graphql'],
  generates: {
    'libs/rick-and-morty/episodes/data-access/src/lib/__generated__/models.ts':
      {
        plugins: ['add', 'typescript'],
        config: {
          avoidOptionals: true,
          content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
        },
      },
    'libs/rick-and-morty/episodes/data-access/src/lib/__generated__/operations.ts':
      {
        plugins: ['add', 'typescript-operations', 'typescript-react-apollo'],
        config: {
          useIndexSignature: true,
          content: 'import * as types from "./models";',
          namespacedImportName: 'types',
        },
      },
  },
  ignoreNoDocuments: true,
};

export default config;
