/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const Promise = require('bluebird');
const category = require('./category.seed');
const user = require('./user.seed');
const product = require('./product.seed');

const prisma = new PrismaClient();

const seedList = [
  {
    table: 'user',
    data: user,
  },
  {
    table: 'category',
    data: category,
  },
  {
    table: 'product',
    data: product,
  }
];

async function main() {
  console.log(`Start seeding ...`);
  await Promise.map(seedList, async ({ table, data }) => {
    for (const each of data) {
      const result = await prisma[table].create({
        data: each,
      });
      console.log(`Created ${table} with id: ${result.id}`);
    }
  });
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
