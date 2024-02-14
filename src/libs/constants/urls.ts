import { minimatch } from 'minimatch';

export const API_URLS = ['/api/**'] as const;

export const PARTIALS_URLS = ['/partial/**'] as const;

export const PROTECTED_PAGE_URLS = ['/*/dashboard', '/*/dashboard/**'] as const;

export function isApiRoute(request: Request): boolean {
  const url = new URL(request.url);
  return API_URLS.some((apiUrl) => minimatch(url.pathname, apiUrl));
}

export function isPageRoute(request: Request): boolean {
  return !isApiRoute(request);
}

export function isHtmlPageRoute(request: Request): boolean {
  return !!request.headers.get('Accept')?.includes('text/html') && isPageRoute(request);
}
