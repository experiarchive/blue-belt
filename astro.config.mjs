// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://airport-bus-info.vercel.app', // 실제 도메인으로 변경 필요
  integrations: [preact(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});