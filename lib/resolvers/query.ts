import { CONSTANTS } from '../constants';
import { prisma } from '../prisma-client';

export const Query = {
  getItems: async (_: any, args: { page?: number }) => {
    const items = await prisma.items.findMany({
      skip: !args.page
        ? 0
        : (args.page - 1) * CONSTANTS.ITEMS.PAGINATION_MAX_TO_TAKE,
      take: CONSTANTS.ITEMS.PAGINATION_MAX_TO_TAKE,
      orderBy: {
        id: 'desc'
      }
    });
    const count = await prisma.items.count();

    return { items, count };
  }
};
