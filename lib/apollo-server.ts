import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from '../lib/graphql/typedefs.graphql';
import { resolvers } from '../lib/resolvers';

export const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});
