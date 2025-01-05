import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL Connected');
  } catch (error) {
    console.error('Error connecting to PostgreSQL', (error as Error).message);
    process.exit(1);
  }
};

export { pool };