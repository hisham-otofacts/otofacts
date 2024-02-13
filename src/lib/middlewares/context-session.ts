import { env } from '@environment';
import redis from '@lib/cache/index';
import { API_URLS } from '@lib/constants/urls';
import type { Session } from '@lib/types';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';
import { v5 as uuidv5 } from 'uuid';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ cookies, request, locals }, next) => {
  const url = new URL(request.url);

  // If it's an API route, continue to the next middleware.
  if (API_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  let sessionId = cookies.get('session')?.value;
  let session = sessionId ? await redis.get<Session>(`session:${sessionId}`) : null;
  if (!session) {
    sessionId = uuidv5(`session-${Date.now()}`, env.SESSION_NAMESPACE);
    session = { id: sessionId };
    cookies.set('session', sessionId, {
      domain: env.COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: 'strict',
    });
  }

  // Reset the session expiration time
  redis.set(`session:${sessionId}`, session, { ex: 60 * 60 });

  // Set session into the locals context (per-request scope)
  locals.session = session;

  return next();
};
