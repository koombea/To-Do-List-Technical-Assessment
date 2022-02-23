import type { NextApiRequest, NextApiResponse } from 'next';
import { apolloServer } from '../../lib/apollo-server';
import Cors from 'micro-cors';

const cors = Cors();
const startApolloServer = apolloServer.start();

export default cors(async (req, res) => {
  await startApolloServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  },
  startApolloServer
};
