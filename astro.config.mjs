import alpine from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import compress from 'astro-compress';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [
    alpine({
      entrypoint: '/src/entrypoint',
    }),
    compress(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
});
