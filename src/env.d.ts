/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    country: import('@lib/constants').CountryConfig;
  }
}

interface Window {
  Alpine: import('alpinejs').Alpine;
  htmx: typeof import('htmx.org');
}
