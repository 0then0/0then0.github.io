import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

/**
 * Public origin of the site. Set SITE_URL (for example in the Pages workflow)
 * when moving to a custom domain; nothing else hardcodes the host.
 */
const site = process.env.SITE_URL ?? 'https://0then0.github.io';

export default defineConfig({
  site,
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/404(?:\.html|\/)$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru', es: 'es', de: 'de', fr: 'fr', ja: 'ja', 'pt-br': 'pt-BR' },
      },
    }),
  ],
});
