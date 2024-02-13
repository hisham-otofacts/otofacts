import { COUNTRY_CONFIG_MAP } from '@lib/country';
import { API_URLS } from '@lib/urls';
import type { MiddlewareHandler } from 'astro';
import { minimatch } from 'minimatch';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect, locals, params }, next) => {
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
