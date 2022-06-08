// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: '.env',
});

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import {
  ApolloServerPluginCacheControl,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { startMongoose } from './connectors/mongoose.connect';

// constants
const PORT = process.env.PORT || 3000;
export async function startApolloServer() {
  const app = express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({}),
      ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await startMongoose();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT, host: '0.0.0.0' }, resolve),
  );
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      `🚀 Server ready at http://127.0.0.1:${PORT}${server.graphqlPath}`,
    );
  }
  return { server, url: `http://127.0.0.1:${PORT}${server.graphqlPath}` };
}
