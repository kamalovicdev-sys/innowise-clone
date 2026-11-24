import { readFileSync } from 'node:fs';
import { test, expect, dict, waitForHydration, scrollToSection } from './fixtures.js';

const services = Object.fromEntries(
  ['uz', 'ru', 'en'].map((lang) => [
    lang,
    JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/services.json`, import.meta.url), 'utf8')),
  ])
);

const PAGES = [
  ['powerBi', 'power-bi'],
  ['onec', '1c-analytics'],
  ['metabase', 'metabase'],
];
const PREFIX = { uz: '/', ru: '/ru/', en: '/en/' };

test.describe('Xizmat sahifalari', () => {
  for (const lang of ['uz', 'ru', 'en']) {
    for (const [key, slug] of PAGES) {
      const path = `${PREFIX[lang]}${slug}/`;
      test(`${path}: sarlavha, canonical, hreflang, JSON-LD`, async ({ page }) => {
        const text = services[lang].pages[key];
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page).toHaveTitle(text.meta.title);
        await expect(page.locator('h1')).toHaveText(text.hero.title);
        await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://mehrzod.uz${path}`);
        await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(4);
        await expect(page.locator('link[rel=alternate][hreflang="x-default"]')).toHaveAttribute('href', `https://mehrzod.uz/${slug}/`);
        const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        expect(ld.map((item) => item['@type'])).toEqual(['Service', 'BreadcrumbList']);
        await expect(page.locator('#problems li[id^="problem-"]')).toHaveCount(3);
        await expect(page.locator('#deliverables li')).toHaveCount(6);
      });
    }
  }

  test('bosh sahifadan "Batafsil" va footer havolalari xizmat sahifalariga olib boradi', async ({ page }) => {
    await page.goto('/ru/');
    await page.locator('#solution-dashboards').getByRole('link', { name: dict.ru.servicePages.metabase }).click();
    await expect(page).toHaveURL(/\/ru\/metabase\/$/);

    await page.locator('footer').getByRole('link', { name: dict.ru.servicePages.onec }).click();
    await expect(page).toHaveURL(/\/ru\/1c-analytics\/$/);
  });

  test('xizmat sahifasi: "Nima olasiz" tugmasi, til almashtirgich, CTA modali, FAQ', async ({ page }) => {
    const text = services.uz.pages.powerBi;
    await page.goto('/power-bi/');
    await waitForHydration(page);

    await page.getByRole('link', { name: text.hero.btnExplore }).click();
    await expect(page).toHaveURL(/#deliverables$/);

    // Til almashtirgich shu xizmatning ruscha sahifasiga olib boradi
    await expect(page.locator('header a[hreflang="ru"]')).toHaveAttribute('href', '/ru/power-bi/');

    await page.locator('#problems [data-open-contact]').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');

    await scrollToSection(page, 'faq');
    const first = Object.values(text.faq.items)[0];
    await expect(page.getByRole('button', { name: first.q })).toHaveAttribute('aria-expanded', 'true');
  });
});
