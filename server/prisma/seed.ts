import { PrismaClient, Prisma } from "@prisma/client";
import * as crypto from "crypto"

const prisma = new PrismaClient();

const urlData = [
  {
    original_url: "https://www.google.com",
    short_url: crypto.randomUUID().substring(0, 6),
  },
  {
    original_url: "https://www.github.com",
    short_url: crypto.randomUUID().substring(0, 6),
  },
  {
    original_url: "https://www.facebook.com",
    short_url: crypto.randomUUID().substring(0, 6),
  },
  {
    original_url: "https://www.twitter.com",
    short_url: crypto.randomUUID().substring(0, 6),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of urlData) {
    const user = await prisma.url.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
