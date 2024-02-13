import type { CountryConfig } from '@lib/types';
import { COUNTRY_CONFIGS } from './country';

export const headerData = (country: CountryConfig) => ({
  links: [
    {
      text: 'Home',
      href: `/${country.code}/`,
    },
    {
      text: 'Pricing',
      href: `/${country.code}/pricing`,
    },
    {
      text: 'Language',
      links: COUNTRY_CONFIGS.map((country) => ({
        text: country.name,
        href: `/${country.code}/`,
      })),
    },
  ],
});
