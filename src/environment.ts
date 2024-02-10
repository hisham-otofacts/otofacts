import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'PUBLIC_',
  /*
   * Environment variables available on the client (and server).
   */
  client: {
    PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  /*
   * Server side Environment variables, not available on the client.
   */
  server: {
    API_SECRET: z.string(),
    CLERK_SECRET_KEY: z.string(),
    CRON_SECRET: z.string(),
    DRIZZLE_DATABASE_URL: z.string().url(),
  },
  runtimeEnv: { ...process.env },
});
