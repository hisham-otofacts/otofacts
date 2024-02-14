import { env } from '@environment';
import cache from '@libs/clients/cache';
import { isHtmlPageRoute } from '@libs/constants/urls';
import type { Session } from '@libs/types';
import type { MiddlewareHandler } from 'astro';
import { v5 as uuidv5 } from 'uuid';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ cookies, request, locals }, next) => {
  // If it's not a page-route, continue to the next middleware.
  if (!isHtmlPageRoute(request)) {
    return next();
  }

  let sessionId = cookies.get('session')?.value;
  let session = sessionId ? await cache.get<Session>(`session:${sessionId}`) : null;
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
  cache.set(`session:${sessionId}`, session, { ex: 60 * 60 });

  // Set session into the locals context (per-request scope)
  locals.session = session;

  return next();
};
