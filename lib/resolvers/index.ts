import { Mutation } from './mutation';
import { Query } from './query';

const Items = {
  id: (parent: any) => parent.id,
  content: (parent: any) => parent.content,
  isCompleted: (parent: any) => parent.isCompleted
};

export const resolvers = {
  Items,
  Query,
  Mutation
};
