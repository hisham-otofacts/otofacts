import clerkClient from '@clerk/clerk-sdk-node';
import { env } from '@environment';
import { PROTECTED_PAGE_URLS } from '@lib/constants/urls';
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

  // Check if the page is protected. If not, continue to the next middleware.
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
