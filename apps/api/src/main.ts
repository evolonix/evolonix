import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Set } from '@evolonix/models-graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Resolvers } from './__generated__/resolvers';

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync(join('libs/models-graphql/src/lib', 'schema.graphql'), { encoding: 'utf-8' });

let sets: Set[] = [
  {
    id: 1,
    name: 'Voltron',
    numParts: 2300,
    year: 2019,
  },
  {
    id: 2,
    name: 'Ship in a Bottle',
    numParts: 900,
    year: 2019,
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    allSets: () => sets,
  },
  Mutation: {
    createSet: (parent, args) => {
      const newSet = {
        ...args,
        id: sets.length + 1,
      } as Set;

      sets.push(newSet);

      return newSet;
    },
    updateSet: (parent, args) => {
      const updated = {
        ...args,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: +args.id!,
      } as Set;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const index = sets.findIndex((set) => set.id === +args.id!);
      sets[index] = updated;

      return updated;
    },
    deleteSet: (parent, args) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sets = sets.filter((set) => set.id !== +args.id!);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { id: +args.id! } as Set;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
