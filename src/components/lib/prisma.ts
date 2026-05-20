import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // এরর ডিবাগ করার জন্য লগ এনাবল করা হলো
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
