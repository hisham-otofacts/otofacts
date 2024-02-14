import { COUNTRY_CONFIG_MAP } from '@libs/constants/country';
import { isPageRoute } from '@libs/constants/urls';
import type { MiddlewareHandler } from 'astro';

/**
 *
 * @param context
 * @param next
 * @returns
 */
export const middleware: MiddlewareHandler = async ({ request, redirect, locals, params }, next) => {
  // If it's not a page-route, continue to the next middleware.
  if (!isPageRoute(request)) {
    return next();
  }

  // Get the country code from the URL
  const countryCode = params.countryCode;
  const country = countryCode ? COUNTRY_CONFIG_MAP[countryCode] : undefined;

  // Redirect to the default country if the country configuration is not found
  if (!country) {
    return redirect('/my/', 302);
  }

  // Set country and page URL into the locals context (per-request scope)
  locals.country = country;
  locals.pageURL = new URL(request.url);

  return next();
};
