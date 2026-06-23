// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://julianZ99.github.io',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Use the "css-variables" theme so code colors come from the site palette
    // (see the --astro-code-* variables in src/styles/global.css) instead of
    // a foreign GitHub theme.
    shikiConfig: {
      theme: 'css-variables',
    },
  },
});