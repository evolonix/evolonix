import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import { join } from 'path';

import { Set } from '@evolonix/models-graphql';
import { Resolvers } from './__generated__/resolvers';

interface MyContext {
  token?: string;
}

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const typeDefs = readFileSync(
  join('libs/models-graphql/src/lib', 'schema.graphql'),
  { encoding: 'utf-8' },
);

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

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://${host}:${port}/`);
