import { env } from '@environment';
import { API_URLS } from '@lib/constants/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request }, next) => {
  const url = new URL(request.url);

  // Check if the API is protected. If not, continue to the next middleware.
  if (!API_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Check if the request has the correct auth header
  const authHeader = request.headers.get('authorization');
  const bearerToken = url.pathname.startsWith('/api/cron/') ? env.CRON_SECRET : env.API_SECRET;
  if (authHeader !== `Bearer ${bearerToken}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  return next();
};
