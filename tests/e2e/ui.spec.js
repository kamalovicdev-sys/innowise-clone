import { test, expect, dict, scrollToSection } from './fixtures.js';

const t = dict.uz;

test.describe('Interaktiv bo\'limlar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Sohalar: FMCG ochiq, "oldingi" logistikaga o\'tadi, strelka bilan tab almashadi', async ({ page }) => {
    await scrollToSection(page, 'industries');
    await expect(page.locator('#industry-tab-fmcg')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#industry-panel')).toContainText(t.problems.labels.consequence);
    await page.getByRole('button', { name: t.industries.prev }).click();
    await expect(page.locator('#industry-tab-logistics')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#industry-panel')).toContainText(t.industries.items.logistics.solution);

    await page.locator('#industry-tab-logistics').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#industry-tab-fmcg')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#industry-tab-fmcg')).toBeFocused();
  });

  test('Muammolar: 6 ta karta, har birida muammo, oqibat va yechim; CTA modalni ochadi', async ({ page }) => {
    const cards = page.locator('#problems li[id^="problem-"]');
    await expect(cards).toHaveCount(6);
    for (const card of await cards.all()) {
      await expect(card.locator('dt')).toHaveText([t.problems.labels.problem, t.problems.labels.consequence, t.problems.labels.solution]);
    }
    await page.locator('#problems [data-open-contact]').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('Yechimlar: "Hal qiladi" havolasi tegishli muammo kartasiga olib boradi', async ({ page }) => {
    await page.locator('#solution-automation a[href="#problem-manualReports"]').click();
    await expect(page).toHaveURL(/#problem-manualReports$/);
    await page.waitForTimeout(1200);
    const headerBottom = await page.locator('header').evaluate((el) => el.getBoundingClientRect().bottom);
    const cardTop = await page.locator('#problem-manualReports').evaluate((el) => el.getBoundingClientRect().top);
    expect(cardTop).toBeGreaterThanOrEqual(headerBottom);
  });

  test('Integratsiyalar: ruscha sahifada 1С kirillcha yoziladi', async ({ page }) => {
    await expect(page.locator('#integrations')).toContainText('1C');
    await page.goto('/ru/');
    await expect(page.locator('#integrations')).toContainText('1С');
    await expect(page.locator('#integrations')).toContainText('МойСклад');
  });

  test('FAQ: bitta savol ochiq, yopiqlari inert; CTA modalni ochadi', async ({ page }) => {
    await scrollToSection(page, 'faq');
    await page.locator('#faq-question-q2').click();
    await expect(page.locator('#faq-question-q2')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#faq-question-q1')).toHaveAttribute('aria-expanded', 'false');
    expect(await page.locator('#faq-answer-q1').evaluate((el) => el.inert)).toBe(true);
    await page.locator('#faq [data-open-contact]').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('menyu havolasi bosilganda sarlavha navbar ostida qolmaydi', async ({ page }) => {
    for (const id of ['problems', 'solutions', 'industries', 'faq']) {
      await page.getByRole('navigation', { name: 'Main' }).locator(`a[href="#${id}"]`).click();
      await page.waitForTimeout(1500);
      const headerBottom = await page.locator('header').evaluate((el) => el.getBoundingClientRect().bottom);
      const titleTop = await page.locator(`#${id} h2`).evaluate((el) => el.getBoundingClientRect().top);
      expect(titleTop).toBeGreaterThanOrEqual(headerBottom);
    }
  });

  test('WhatsApp havolalari (Contact, footer, mobil panel) yangi oynada xavfsiz ochiladi', async ({ page }) => {
    const links = page.locator('a[href="https://wa.me/998955209595"]');
    await expect(links).toHaveCount(3);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });
});

test.describe('Boshqa sahifalar', () => {
  test('Maxfiylik siyosati qoralama: noindex, belgi, havolalar to\'g\'ri', async ({ page }) => {
    await page.goto('/ru/privacy/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
    await expect(page.getByRole('note')).toHaveText(dict.ru.legal.draftNotice);
    await expect(page.locator('header nav a').first()).toHaveAttribute('href', '/ru/#problems');
    await expect(page.locator('header a[hreflang=uz]')).toHaveAttribute('href', '/privacy/');
    await expect(page.locator('footer a[href*=privacy]')).toHaveCount(0);
  });

});

test.describe('404', () => {
  test.use({ allowedConsoleErrors: [/status of 404/] });

  test('noma\'lum manzil 404 sahifasini ko\'rsatadi', async ({ page }) => {
    const response = await page.goto('/mavjud-emas');
    expect(response.status()).toBe(404);
    await expect(page).toHaveTitle(new RegExp(t.notFound.title));
  });
});

test.describe('To\'g\'ridan-to\'g\'ri havola (reklama sitelink\'i)', () => {
  test('/#problem-inventory ochilganda karta navbar ostida qolmaydi', async ({ page }) => {
    await page.goto('/#problem-inventory');
    await page.waitForTimeout(1200);
    const headerBottom = await page.locator('header').evaluate((el) => el.getBoundingClientRect().bottom);
    const cardTop = await page.locator('#problem-inventory').evaluate((el) => el.getBoundingClientRect().top);
    expect(cardTop).toBeGreaterThanOrEqual(headerBottom);
    expect(cardTop).toBeLessThan(400);
  });
});
