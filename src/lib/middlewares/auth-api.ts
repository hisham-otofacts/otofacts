import { env } from '@environment';
import { isApiRoute } from '@lib/constants/urls';
import type { MiddlewareHandler } from 'astro';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request }, next) => {
  // If it's not an API route, continue to the next middleware.
  if (!isApiRoute(request)) {
    return next();
  }

  // Check if the request has the correct auth header
  const url = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const bearerToken = url.pathname.startsWith('/api/cron/') ? env.CRON_SECRET : env.API_SECRET;
  if (authHeader !== `Bearer ${bearerToken}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  return next();
};
