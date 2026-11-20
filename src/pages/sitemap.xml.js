import { LOCALES, DEFAULT_LOCALE, localizedPath } from '@i18n';

// Sitemap Search Console'da allaqachon ro'yxatdan o'tgan /sitemap.xml manzilida qoladi.
// Har bir sahifa uchun uchala til versiyasi hreflang orqali bog'lanadi.
// Yangi sahifa qo'shilsa, uning tilga bog'liq bo'lmagan yo'lini shu ro'yxatga yozing (masalan 'privacy/').
const PAGES = [''];

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET({ site }) {
  const absolute = (lang, path) => escapeXml(new URL(localizedPath(lang, path), site).href);

  const urls = PAGES.flatMap((path) => {
    const alternates = [
      ...LOCALES.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(lang, path)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(DEFAULT_LOCALE, path)}"/>`,
    ].join('\n');

    return LOCALES.map((lang) => `  <url>\n    <loc>${absolute(lang, path)}</loc>\n${alternates}\n  </url>`);
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
