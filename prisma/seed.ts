import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const res = await prisma.items.deleteMany({});
  console.log(res);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
