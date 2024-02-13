import type { CountryConfig } from '@lib/types';

export const COUNTRY_CONFIGS: Readonly<CountryConfig[]> = [
  {
    code: 'my',
    name: 'Malaysia',
    currency: 'RM',
    language: 'en',
  },
  {
    code: 'sg',
    name: 'Singapore',
    currency: 'SGD',
    language: 'en',
  },
  {
    code: 'pk',
    name: 'Pakistan',
    currency: 'PKR',
    language: 'en',
  },
];

export const COUNTRY_CONFIG_MAP: Readonly<Record<string, CountryConfig>> = COUNTRY_CONFIGS.reduce(
  (acc, country) => ({ ...acc, [country.code]: country }),
  {},
);
