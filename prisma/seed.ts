import {Prisma, PrismaClient} from "@/lib/generated/prisma/client";


import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    email: "admin@cdwphysio.com",
    hashedPassword: "admin123",
    name: "Admin",
    role: "admin",
    emailVerified: new Date(),
  },
  {
    email: "user@cdwphysio.com",
    hashedPassword: "user123",
    name: "User",
    role: "user",
    emailVerified: new Date(),
  },
];

export async function main() {
  console.log("🌱 Seeding database...");

  for (const data of userData) {
    await prisma.user.create({data});
  }

  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient, Prisma } from "../app/generated/prisma/client";
// import { PrismaPg } from '@prisma/adapter-pg'
// import 'dotenv/config'
//
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// })
//
// const prisma = new PrismaClient({
//   adapter,
// });
//
// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Join the Prisma Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
// ];
//
// export async function main() {
//   for (const u of userData) {
//     await prisma.user.create({ data: u });
//   }
// }
//
// main();
