import { env } from '@environment';
import * as schema from '@libs/database/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const client = neon(env.DRIZZLE_DATABASE_URL);
const database = drizzle(client, { schema });

export default database;
