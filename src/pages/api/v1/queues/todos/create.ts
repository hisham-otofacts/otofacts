import database from '@libs/clients/database';
import { todo } from '@libs/database/schema';
import { namedLogger } from '@libs/logger';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const input = await request.json();
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const logger = namedLogger('queues-todo-create', { input, headers });
  logger.info('Processing create todo queue job');

  try {
    const data = await database.insert(todo).values({ name: input.name }).returning();
    return new Response(JSON.stringify({ status: 'ok', data }));
  } catch (error) {
    return new Response(JSON.stringify({ status: 'error', message: (error as Error).message }), { status: 500 });
  }
};
