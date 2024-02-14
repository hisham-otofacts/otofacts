import { clerkClient } from '@lib/auth/client';
import { API_URLS, PROTECTED_PAGE_URLS } from '@lib/constants/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect, locals }, next) => {
  const url = new URL(request.url);

  // If it's an API route, continue to the next middleware.
  if (API_URLS.some((path) => minimatch(url.pathname, path))) {
    return next();
  }

  // Check if the user is signed in
  const { isSignedIn } = await clerkClient.authenticateRequest({ request });

  // Redirect to the login if the user is not signed in and attempts to open a protected page
  if (!isSignedIn && PROTECTED_PAGE_URLS.some((path) => minimatch(url.pathname, path))) {
    return redirect(`/${locals.country.code}/`);
  }

  // Set the isSignedIn flag in the locals object (per-request scope)
  locals.isSignedIn = isSignedIn;

  return next();
};
