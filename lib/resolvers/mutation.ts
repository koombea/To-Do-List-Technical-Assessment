import { ApolloError } from '@apollo/client';
import { CONSTANTS } from '../constants';
import { prisma } from '../prisma-client';

export const Mutation = {
  create: (_: any, args: { content: string }) => {
    if (args.content.length < CONSTANTS.ITEMS.MIN_CONTENT_LENGTH) {
      throw new ApolloError({
        errorMessage: CONSTANTS.ERRORS.MIN_CONTENT_LENGTH
      });
    }
    if (args.content.length > CONSTANTS.ITEMS.MAX_CONTENT_LENGTH) {
      throw new ApolloError({
        errorMessage: CONSTANTS.ERRORS.MAX_CONTENT_LENGTH
      });
    }
    return prisma.items.create({
      data: {
        content: args.content,
        isCompleted: false
      }
    });
  },
  deleteById: (_: any, args: { id: number }) =>
    prisma.items.delete({
      where: { id: args.id }
    }),
  setIsCompleted: (_: any, args: { id: number; isCompleted: boolean }) =>
    prisma.items.update({
      data: {
        isCompleted: args.isCompleted
      },
      where: {
        id: args.id
      }
    })
};
