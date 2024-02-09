import { env } from '@env';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const client = neon(env.DRIZZLE_DATABASE_URL);
const db = drizzle(client, { schema });

export default db;
