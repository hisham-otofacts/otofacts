import { API_URLS, PARTIALS_URLS } from '@lib/constants/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

const API_OR_PARTIAL_URLS = [...API_URLS, ...PARTIALS_URLS];

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);

  // If a GET request on a non-API and non-partial URL does not end with a trailing slash,
  // redirect to the same URL with a trailing slash
  if (
    request.method === 'GET' &&
    !API_OR_PARTIAL_URLS.some((path) => minimatch(url.pathname, path)) &&
    !url.pathname.endsWith('/')
  ) {
    return redirect(`${url.pathname}/`, 301);
  }

  return next();
};
