export type CountryConfig = {
  name: string;
  currency: string;
  language: string;
};

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
