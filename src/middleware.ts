import clerkClient from '@clerk/clerk-sdk-node';
import { env } from '@env';
import type { MiddlewareHandler } from 'astro';

const protectedPageUrls = ['/dashboard'];

/**
 * Check if the user is signed in before accessing protected pages.
 *
 * @param context
 * @param next
 * @returns
 */
export const onRequest: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);

  // Check if the page is protected. If nor, continue to the next middleware.
  if (!protectedPageUrls.some((path) => url.pathname.startsWith(path))) {
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
