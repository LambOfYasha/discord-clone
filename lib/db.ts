import { PrismaClient as PostgresClient } from "@/prisma/generated/postgres";
import { PrismaClient as MongoClient } from "@/prisma/generated/mongo";

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

// Utility function to handle MongoDB operations with PostgreSQL fallback
export async function withMongoFallback<T>(
  mongoOperation: () => Promise<T>,
  postgresFallback: () => Promise<T>,
  operationName: string = "database operation"
): Promise<T> {
  try {
    // Try MongoDB first
    return await mongoOperation();
  } catch (error) {
    console.log(`[${operationName}] MongoDB failed, falling back to PostgreSQL:`, error);
    
    try {
      // Fallback to PostgreSQL
      const result = await postgresFallback();
      console.log(`[${operationName}] Successfully used PostgreSQL fallback`);
      return result;
    } catch (fallbackError) {
      console.log(`[${operationName}] PostgreSQL fallback also failed:`, fallbackError);
      throw fallbackError;
    }
  }
}

// Utility function to sync data to both databases for redundancy
export async function syncToBothDatabases<T>(
  mongoOperation: () => Promise<T>,
  postgresOperation: () => Promise<T>,
  operationName: string = "sync operation"
): Promise<T> {
  try {
    // Try to perform operation on both databases
    const [mongoResult, postgresResult] = await Promise.allSettled([
      mongoOperation(),
      postgresOperation()
    ]);

    // If MongoDB succeeds, return its result
    if (mongoResult.status === 'fulfilled') {
      console.log(`[${operationName}] MongoDB operation successful`);
      return mongoResult.value;
    }

    // If MongoDB fails but PostgreSQL succeeds, return PostgreSQL result
    if (postgresResult.status === 'fulfilled') {
      console.log(`[${operationName}] MongoDB failed, using PostgreSQL result`);
      return postgresResult.value;
    }

    // If both fail, throw the error
    throw mongoResult.reason || postgresResult.reason;
  } catch (error) {
    console.log(`[${operationName}] Both databases failed:`, error);
    throw error;
  }
}

// Utility to check database health
export async function checkDatabaseHealth() {
  const health = {
    mongodb: false,
    postgresql: false,
    timestamp: new Date().toISOString()
  };

  try {
    await mongo.$queryRaw`SELECT 1`;
    health.mongodb = true;
  } catch (error) {
    console.log("MongoDB health check failed:", error);
  }

  try {
    await postgres.$queryRaw`SELECT 1`;
    health.postgresql = true;
  } catch (error) {
    console.log("PostgreSQL health check failed:", error);
  }

  return health;
}
