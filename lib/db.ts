import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Prevent multiple instances in development (Next.js hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient() {
  // Create connection pool with connection string
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Store pool in global for cleanup
  globalForPrisma.pool = pool;

  // Create Prisma adapter with the pg pool
  const adapter = new PrismaPg(pool);

  // Initialize Prisma Client with adapter
  return new PrismaClient({
    adapter,
  });
}

// Use existing instance or create new one
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Cache the instance in development to prevent too many connections
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
