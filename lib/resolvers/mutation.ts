import { prisma } from '../prisma-client';

export const Mutation = {
  create: (_: any, args: { content: string }) =>
    prisma.items.create({
      data: {
        content: args.content,
        isCompleted: false
      }
    }),
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
