import { namedLogger } from '@libs/logger';
import type { APIRoute } from 'astro';

const logger = namedLogger('crons-reports-daily');

export const GET: APIRoute = async () => {
  logger.info('Processing daily report cron');
  return new Response(JSON.stringify({ status: 'ok' }));
};
