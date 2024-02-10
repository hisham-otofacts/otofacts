import clerkClient from '@clerk/clerk-sdk-node';
import { env } from '@environment';
import { API_URLS, COUNTRY_CONFIGS, PROTECTED_PAGE_URLS } from '@lib/constants';
import type { MiddlewareHandler } from 'astro';
import { sequence } from 'astro/middleware';
import { minimatch } from 'minimatch';

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
export const authPage: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);

  // Check if the page is protected. If not, continue to the next middleware.
  if (!PROTECTED_PAGE_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Check if the user is signed in
  const { isSignedIn } = await clerkClient.authenticateRequest({
    request,
    publishableKey: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: env.CLERK_SECRET_KEY,
  });

  // Redirect to the homepage if the user is not signed in
  if (!isSignedIn) {
    return redirect('/');
  }

  return next();
};

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const localContext: MiddlewareHandler = async ({ request, redirect, locals }, next) => {
  const url = new URL(request.url);

  // Check if it's a non-API route. If it's an API route, continue to the next middleware.
  if (!API_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Get the country code from the URL
  const countryCode = url.pathname.split('/').shift();
  const country = countryCode ? COUNTRY_CONFIGS[countryCode] : undefined;

  // Redirect to the default country if the country configuration is not found
  if (!country) {
    return redirect('/my/');
  }

  // Set country to the locals context (per-request scope)
  locals.country = country;

  return next();
};

export const onRequest = sequence(authApi, authPage, localContext);
