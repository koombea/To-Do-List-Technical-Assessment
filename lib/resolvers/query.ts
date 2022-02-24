import { CONSTANTS } from '../constants';
import { prisma } from '../prisma-client';

export const Query = {
  getItems: async (_: any, args: { offset?: number }) => {
    const items = await prisma.items.findMany({
      skip: !args.offset ? 0 : args.offset > 0 ? args.offset - 1 : args.offset,
      take: CONSTANTS.ITEMS.PAGINATION_OFFSET,
      orderBy: {
        id: 'asc'
      }
    });
    const count = await prisma.items.count({
      skip: !args.offset
        ? CONSTANTS.ITEMS.PAGINATION_OFFSET
        : args.offset > 0
        ? CONSTANTS.ITEMS.PAGINATION_OFFSET * args.offset
        : CONSTANTS.ITEMS.PAGINATION_OFFSET
    });

    return { items, count };
  }
};
