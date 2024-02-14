import { isHtmlPageRoute, PARTIALS_URLS } from '@libs/constants/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);

  // If a GET request on a page route (but not a partial route) and does not end with a trailing slash,
  // redirect to the same URL with a trailing slash
  if (
    request.method === 'GET' &&
    !url.pathname.endsWith('/') &&
    isHtmlPageRoute(request) &&
    !PARTIALS_URLS.some((path) => minimatch(url.pathname, path))
  ) {
    return redirect(`${url.pathname}/`, 301);
  }

  return next();
};
