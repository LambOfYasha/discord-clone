import { PrismaClient as PostgresClient } from "../../prisma/generated/postgres";
import { PrismaClient as MongoClient } from "../../prisma/generated/mongo";

declare global {
  var postgres: PostgresClient | undefined;
  var mongo: MongoClient | undefined;
}

// PostgreSQL client for user/signup logic
export const postgres = global.postgres || new PostgresClient();

// MongoDB client for chat/messaging logic
export const mongo = global.mongo || new MongoClient();

// Legacy export for backward compatibility (defaults to postgres)
export const db = postgres;

if (process.env.NODE_ENV !== "production") {
  globalThis.postgres = postgres;
  globalThis.mongo = mongo;
}
