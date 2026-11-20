import { test, expect, dict, waitForHydration } from './fixtures.js';

const t = dict.uz;

test.describe('Telefon', () => {
  test('mobil menyu ochiladi, Esc bilan yopiladi va fokus gamburgerga qaytadi', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    const burger = page.getByRole('button', { name: t.nav.openMenu });
    await burger.click();
    const menu = page.locator('header nav[aria-label=Mobile]');
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: t.nav.openMenu })).toBeFocused();
  });

  test('tezkor aloqa paneli hero\'dan keyin paydo bo\'ladi va modalni ochadi', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
    const bar = page.locator('[data-mobile-cta]');
    expect(await bar.evaluate((el) => el.inert)).toBe(true);

    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(bar).toHaveAttribute('data-visible', '');
    await expect(bar.locator('a[href="tel:+998955209595"]')).toBeVisible();
    await bar.locator('[data-open-contact]').click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  for (const path of ['/', '/ru/', '/en/', '/privacy/']) {
    test(`320px kenglikda ${path} gorizontal aylanmaydi, panel sig'adi`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 700 });
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

      if (path !== '/privacy/') {
        await page.mouse.wheel(0, 2500);
        const bar = page.locator('[data-mobile-cta]');
        await expect(bar).toHaveAttribute('data-visible', '');
        const right = await bar.evaluate((el) => Math.max(...[...el.children].map((c) => c.getBoundingClientRect().right)));
        expect(right).toBeLessThanOrEqual(320);
      }
    });
  }
});
