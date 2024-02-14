import { clerkClient } from '@lib/auth/client';
import { isHtmlPageRoute, PROTECTED_PAGE_URLS } from '@lib/constants/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect, locals }, next) => {
  // If it's not a page-route, continue to the next middleware.
  if (!isHtmlPageRoute(request)) {
    return next();
  }

  // Check if the user is signed in
  const url = new URL(request.url);
  const { toAuth, isSignedIn } = await clerkClient.authenticateRequest({ request });

  // Redirect to the login if the user is not signed in and attempts to open a protected page
  if (!isSignedIn && PROTECTED_PAGE_URLS.some((path) => minimatch(url.pathname, path))) {
    return redirect(`/${locals.country.code}/`);
  }

  // If the user is signed in, set the user data in the locals object (per-request scope)
  if (isSignedIn) {
    const auth = toAuth();
    locals.user = await clerkClient.users.getUser(auth!.userId!);
  }

  // Set the isSignedIn flag in the locals object (per-request scope)
  locals.isSignedIn = isSignedIn;

  return next();
};
