import { test, expect, dict, scrollToSection } from './fixtures.js';

const t = dict.uz;

test.describe('Interaktiv bo\'limlar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Expertise: strelka bilan tab almashadi', async ({ page }) => {
    await scrollToSection(page, 'expertise');
    const tablist = page.locator('#expertise [role=tablist]');
    await tablist.getByRole('tab', { selected: true }).focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#expertise-tab-backend')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#expertise-tab-backend')).toBeFocused();
    await expect(page.locator('#expertise-panel')).toContainText('FastAPI');
  });

  test('Portfolio: logistika ochiq, "oldingi" tugmasi bankingga o\'tadi, rasm WebP srcset bilan', async ({ page }) => {
    await scrollToSection(page, 'portfolio');
    await expect(page.locator('#portfolio-tab-logistics')).toHaveAttribute('aria-selected', 'true');
    const img = page.locator('#portfolio-panel img');
    await expect(img).toHaveAttribute('srcset', /\.webp 480w.*\.webp 1200w/);
    await page.getByRole('button', { name: t.portfolio.prev }).click();
    await expect(page.locator('#portfolio-tab-banking')).toHaveAttribute('aria-selected', 'true');
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
    for (const id of ['services', 'portfolio', 'faq']) {
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
    await expect(page.locator('header nav a').first()).toHaveAttribute('href', '/ru/#services');
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
