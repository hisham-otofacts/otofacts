/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    country: import('@lib/constants/country').CountryConfig;
    isSignedIn?: boolean;
    pageURL: import('node:url').URL;
    session: import('@lib/session').Session;
    user?: import('@clerk/clerk-sdk-node').User;
  }
}

interface Window {
  Alpine: import('alpinejs').Alpine;
  htmx: typeof import('htmx.org');
}
