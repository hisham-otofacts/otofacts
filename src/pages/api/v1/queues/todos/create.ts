import { namedLogger } from '@lib/logger';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const logger = namedLogger('queues-todo-create', { data, headers });
  logger.info('Processing create todo queue job');
  return new Response(JSON.stringify({ status: 'ok', data }));
};
