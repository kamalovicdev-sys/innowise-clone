// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://mehrzod.uz',

  // Har bir til o'z URL'ida: / (o'zbekcha, standart), /ru/, /en/
  i18n: {
    locales: ['uz', 'ru', 'en'],
    defaultLocale: 'uz',
    routing: { prefixDefaultLocale: false },
  },

  // Sitemap: src/pages/sitemap.xml.js (Search Console'dagi /sitemap.xml manzili saqlanadi)
  integrations: [react()],

  // EmailJS kalitlari .env faylidan olinadi (namuna: .env.example).
  // Kalit yo'q bo'lsa build xato beradi, forma jimgina buzilib qolmaydi.
  env: {
    schema: {
      PUBLIC_EMAILJS_SERVICE_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_EMAILJS_TEMPLATE_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_EMAILJS_PUBLIC_KEY: envField.string({ context: 'client', access: 'public' }),
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
