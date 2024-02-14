import { namedLogger } from '@lib/logger';
import type { APIRoute } from 'astro';

const logger = namedLogger('queues-todo-create');

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  logger.info('Processing create todo queue job', data);
  return new Response(JSON.stringify({ status: 'ok', data }));
};
