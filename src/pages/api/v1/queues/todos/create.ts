import { namedLogger } from '@lib/logger';
import type { APIRoute } from 'astro';

const logger = namedLogger('queues-todo-create');

export const GET: APIRoute = async () => {
  logger.info('Processing create todo queue job');
  return new Response(JSON.stringify({ status: 'ok' }));
};
