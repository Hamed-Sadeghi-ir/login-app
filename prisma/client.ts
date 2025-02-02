// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();
//   new PrismaClient({
//     log: ["query"], // to log all queries sent to the db
//   });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
