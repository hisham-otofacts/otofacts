import clerkClient from '@clerk/clerk-sdk-node';
import { env } from '@environment';
import redis from '@lib/cache/index';
import { COUNTRY_CONFIG_MAP } from '@lib/country';
import type { Session } from '@lib/session';
import { API_URLS, PROTECTED_PAGE_URLS } from '@lib/urls';
import type { MiddlewareHandler } from 'astro';
import { sequence } from 'astro/middleware';
import { minimatch } from 'minimatch';
import { v5 as uuidv5 } from 'uuid';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const authApi: MiddlewareHandler = async ({ request }, next) => {
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

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const localContext: MiddlewareHandler = async ({ request, redirect, locals, params }, next) => {
  const url = new URL(request.url);

  // Check if it's a non-API route. If it's an API route, continue to the next middleware.
  if (API_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Get the country code from the URL
  const countryCode = params.countryCode;
  console.log('countryCode', countryCode);
  const country = countryCode ? COUNTRY_CONFIG_MAP[countryCode] : undefined;

  // Redirect to the default country if thee country configuration is not found
  if (!country) {
    return redirect('/my/');
  }

  // Set country into the locals context (per-request scope)
  locals.country = country;

  return next();
};

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const authPage: MiddlewareHandler = async ({ request, redirect, locals }, next) => {
  const url = new URL(request.url);

  // Check if the page is protected. If not, continue to the next middleware.
  console.log(
    url.pathname,
    PROTECTED_PAGE_URLS.some((path) => minimatch(url.pathname, path)),
  );
  if (!PROTECTED_PAGE_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Check if the user is signed in
  const auth = await clerkClient.authenticateRequest({
    request,
    publishableKey: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: env.CLERK_SECRET_KEY,
  });

  // Redirect to the homepage if the user is not signed in
  if (!auth.isSignedIn) {
    return redirect(`/${locals.country.code}/login/`);
  }

  return next();
};

export const sessionContext: MiddlewareHandler = async ({ cookies, request, locals }, next) => {
  const url = new URL(request.url);

  // Check if it's a non-API route. If it's an API route, continue to the next middleware.
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

export const onRequest = sequence(authApi, localContext, authPage, sessionContext);
