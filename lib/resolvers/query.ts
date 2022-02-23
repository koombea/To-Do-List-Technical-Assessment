import { prisma } from '../prisma-client';

export const Query = {
  getItems: (_: any, args: { cursor?: number }) =>
    prisma.items.findMany({
      cursor: {
        id: args.cursor ? 1 : args.cursor
      },
      skip: !args.cursor ? 0 : args.cursor > 0 ? args.cursor - 1 : args.cursor,
      take: 10,
      orderBy: {
        id: 'asc'
      }
    })
};
