import type { Config } from 'drizzle-kit';

export default {
  schema: './src/libs/database/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;
