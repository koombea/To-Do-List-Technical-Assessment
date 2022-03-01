import { CONSTANTS } from '../constants';
import { prisma } from '../prisma-client';

export const Query = {
  getItems: async (_: any, args: { cursor?: number }) => {
    if (args.cursor) {
      return prisma.items.findMany({
        take: CONSTANTS.ITEMS.PAGINATION_MAX_TO_TAKE,
        skip: 1, //For skipping the cursor.
        cursor: {
          id: args.cursor
        },
        orderBy: {
          id: 'desc'
        }
      });
    } else {
      return prisma.items.findMany({
        take: CONSTANTS.ITEMS.PAGINATION_MAX_TO_TAKE,
        orderBy: {
          id: 'desc'
        }
      });
    }
  }
};
