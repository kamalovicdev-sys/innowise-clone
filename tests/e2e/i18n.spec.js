import { test, expect, dict, waitForHydration } from './fixtures.js';

test.describe('Tillar va URL', () => {
  for (const [path, lang] of [['/', 'uz'], ['/ru/', 'ru'], ['/en/', 'en']]) {
    test(`${path} — ${lang} sahifasi: lang, sarlavha, canonical, hreflang, og:image`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toHaveText(dict[lang].hero.title);
      await expect(page).toHaveTitle(dict[lang].meta.title);
      await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://mehrzod.uz${path}`);
      await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(4);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://mehrzod.uz/og/og-${lang}.jpg`);
      const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
      expect(ld.map((item) => item['@type'])).toEqual(['ProfessionalService', 'WebSite']);
    });
  }

  test('til tanlovi saqlanadi va / ochilganda shu tilga yo\'naltiradi', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    await page.getByRole('button', { name: new RegExp(dict.uz.nav.language) }).click();
    await page.locator('header a[hreflang="ru"]').click();
    await expect(page).toHaveURL(/\/ru\/$/);
    expect(await page.evaluate(() => localStorage.getItem('mehrzod_lang'))).toBe('ru');

    await page.goto('/');
    await expect(page).toHaveURL(/\/ru\/$/);

    await waitForHydration(page);
    await page.getByRole('button', { name: new RegExp(dict.ru.nav.language) }).click();
    await page.locator('header a[hreflang="uz"]').click();
    await page.goto('/');
    await expect(page).toHaveURL(/localhost:\d+\/$/);
  });

  test('?lng=en havolasi /en/ ga olib boradi', async ({ page }) => {
    await page.goto('/?lng=en');
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test('sitemap.xml: 3 ta til, hreflang bilan; qoralama sahifalar yo\'q', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    expect(xml.match(/<loc>/g)).toHaveLength(3);
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).not.toContain('privacy');
  });
});
