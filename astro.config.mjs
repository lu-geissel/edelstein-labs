import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://labs.edelsteinstrategie.de',
  // German stays at the root, English lives under /en/.
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  output: 'static',
  vite: {
    cacheDir: process.env.SITE_VITE_CACHE || 'node_modules/.vite',
  },
  server: {
    port: 4321,
    host: '0.0.0.0',
  },
});
