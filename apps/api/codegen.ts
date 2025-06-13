import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/models-graphql/src/lib/schema.graphql',
  generates: {
    'apps/api/src/__generated__/resolvers.ts': {
      plugins: ['add', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        content: `/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as types from "@evolonix/models-graphql"`,
        namespacedImportName: 'types',
      },
    },
  },
};
export default config;
