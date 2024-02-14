import { env } from '@environment';
import { receiver } from '@lib/clients/queue';
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

  let valid = true;
  if (url.pathname.startsWith('/api/crons/')) {
    valid = authHeader !== `Bearer ${env.CRON_SECRET}`;
  } else if (url.pathname.startsWith('/api/queues/')) {
    const signature = request.headers.get('upstash-signature');
    valid = !!signature && (await receiver.verify({ signature, body: await request.text() }));
  } else {
    valid = authHeader !== `Bearer ${env.API_SECRET}`;
  }

  if (!valid) {
    return new Response('Unauthorized', { status: 401 });
  }

  return next();
};
