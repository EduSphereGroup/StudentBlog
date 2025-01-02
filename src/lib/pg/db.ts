import { Pool, PoolClient } from "pg";
import { env } from "@/env";

const CONFIG = {
  user: env.POSTGRES_USER,
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DB,
  password: env.POSTGRES_PASSWORD,
  port: env.POSTGRES_PORT || 5432,
};

class Database {
  private pool: Pool;
  private client: PoolClient | undefined;

  constructor() {
    this.pool = new Pool(CONFIG);
    this.connect();
  }

  private async connect() {
    try {
      this.client = await this.pool.connect();
      console.log("Database connected successfully!");
    } catch (error) {
      if (error instanceof AggregateError) {
        console.error("Multiple errors occurred:", error.errors);
      } else {
        console.error("Error connecting to database:", error);
      }
      throw new Error("Could not connect to the database");
    }
  }

  get clientInstance() {
    return this.client;
  }
}

export const database = new Database();
