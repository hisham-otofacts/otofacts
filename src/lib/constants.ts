export interface CountryConfig {
  name: string;
  currency: string;
  language: string;
}

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  my: {
    name: 'Malaysia',
    currency: 'RM',
    language: 'en',
  },
  sg: {
    name: 'Singapore',
    currency: 'SGD',
    language: 'en',
  },
  pk: {
    name: 'Pakistan',
    currency: 'PKR',
    language: 'en',
  },
} as const;

export const API_URLS = ['/api/**'] as const;

export const PROTECTED_PAGE_URLS = ['/*/dashboard/**'] as const;
