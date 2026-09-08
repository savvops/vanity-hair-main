import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://vanityhairwpg.ca',
  output: 'static',
  server: {
    allowedHosts: ['nucbox-m7-1.taila7272b.ts.net'],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({ filter: (page) => !/\/(edit|success)\/?$/.test(page) }),
  ],
  build: {
    format: 'directory',
  },
  compressHTML: true,
  prefetch: false,
});
