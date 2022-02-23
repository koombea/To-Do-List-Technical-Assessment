import { prisma } from '../prisma-client';

export const Query = {
  getItems: (_: any, args: { offset?: number }) =>
    prisma.items.findMany({
      skip: !args.offset ? 0 : args.offset > 0 ? args.offset - 1 : args.offset,
      take: 10,
      orderBy: {
        id: 'asc'
      }
    })
};
