import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://labs.edelsteinstrategie.de',
  output: 'static',
  server: {
    port: 4321,
    host: '0.0.0.0',
  },
});
