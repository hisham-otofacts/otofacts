/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    country: import('@lib/country').CountryConfig;
    session: import('@lib/session').Session;
  }
}

interface Window {
  Alpine: import('alpinejs').Alpine;
  htmx: typeof import('htmx.org');
}
