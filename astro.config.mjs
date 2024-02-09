import alpine from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [alpine({ entrypoint: '/src/entrypoint' }), tailwind()],
  output: 'server',
});
