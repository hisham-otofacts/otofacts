import { namedLogger } from '@lib/logger';
import type { APIRoute } from 'astro';

const logger = namedLogger('queues-todo-create');

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  logger.info('Processing create todo queue job', data, headers);
  return new Response(JSON.stringify({ status: 'ok', data }));
};
