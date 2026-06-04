import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://labs.edelsteinstrategie.de',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
    host: '0.0.0.0',
  },
});
