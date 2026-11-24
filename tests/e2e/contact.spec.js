import { test, expect, dict, scrollToSection, waitForHydration } from './fixtures.js';

const t = dict.uz;

test.describe('Aloqa oynasi (modal)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
  });

  test('Hero tugmasi ochadi, Esc yopadi, fokus tugmaga qaytadi', async ({ page }) => {
    const trigger = page.locator('#hero [data-open-contact]');
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('input[name=name]')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('orqa fonga bosilganda yopiladi va sahifa aylanmaydi', async ({ page }) => {
    await page.locator('header').getByRole('button', { name: t.nav.contact, exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden');
    await page.mouse.click(8, 8);
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('bo\'sh forma: yuborilmaydi, xatolar o\'zbekcha, fokus birinchi xatoga', async ({ page, emailjs }) => {
    await page.locator('#hero [data-open-contact]').click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: t.contactModal.btnSubmit }).click();
    await expect(dialog.locator('[aria-invalid=true]')).toHaveCount(2);
    await expect(dialog.getByText(t.form.errors.required).first()).toBeVisible();
    await expect(dialog.locator('input[name=name]')).toBeFocused();
    expect(emailjs.requests).toHaveLength(0);
  });

  test('to\'ldirilgan forma yuboriladi, muvaffaqiyat ko\'rinadi va oyna o\'zi yopiladi', async ({ page, emailjs }) => {
    await page.locator('#hero [data-open-contact]').click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('input[name=name]').fill('Test Foydalanuvchi');
    await dialog.locator('input[name=phone]').fill('901234567');
    await dialog.locator('input[name=company]').fill('Test MChJ');
    await dialog.getByRole('button', { name: t.contactModal.btnSubmit }).click();

    await expect(dialog.getByRole('status')).toContainText(t.contactModal.successTitle);
    expect(emailjs.requests).toHaveLength(1);
    expect(emailjs.requests[0].template_params).toMatchObject({
      name: 'Test Foydalanuvchi',
      phone: '+998 90 123 45 67',
      company: 'Test MChJ',
    });
    expect(emailjs.requests[0].template_params).not.toHaveProperty('website');
    await expect(dialog).toBeHidden({ timeout: 6000 });

    // 10 soniya ichida qayta yuborish bloklanadi (EmailJS rate limit)
    await page.locator('header').getByRole('button', { name: t.nav.contact, exact: true }).click();
    await expect(dialog.locator('input[name=name]')).toHaveValue('');
    await dialog.locator('input[name=name]').fill('Ikkinchi');
    await dialog.locator('input[name=phone]').fill('901234567');
    await dialog.getByRole('button', { name: t.contactModal.btnSubmit }).click();
    await expect(dialog.getByRole('alert')).toBeVisible();
    expect(emailjs.requests).toHaveLength(1);
  });
});

test.describe('Contact bo\'limi formasi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToSection(page, 'contact');
  });

  test('honeypot to\'ldirilsa xat yuborilmaydi, lekin muvaffaqiyat ko\'rsatiladi', async ({ page, emailjs }) => {
    const form = page.locator('#contact form');
    await form.locator('input[name=name]').fill('Bot');
    await form.locator('input[name=phone]').fill('901234567');
    await form.locator('input[name=website]').fill('http://spam.example', { force: true });
    await form.getByRole('button', { name: t.contact.btnEstimate }).click();
    await expect(page.locator('#contact [role=status]')).toBeVisible();
    expect(emailjs.requests).toHaveLength(0);
  });

  test('telefon +998 formatiga keltiriladi, noto\'g\'ri email to\'xtatiladi', async ({ page, emailjs }) => {
    const form = page.locator('#contact form');
    const phone = form.locator('input[name=phone]');
    await phone.fill('901234567');
    await phone.blur();
    await expect(phone).toHaveValue('+998 90 123 45 67');

    await form.locator('input[name=name]').fill('Email Test');
    await form.locator('input[name=email]').fill('notanemail');
    await form.getByRole('button', { name: t.contact.btnEstimate }).click();
    await expect(form.locator('input[name=email]')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.getByText(t.form.errors.email)).toBeVisible();
    expect(emailjs.requests).toHaveLength(0);

    await form.locator('input[name=email]').fill('');
    await expect(form.locator('input[name=email]')).not.toHaveAttribute('aria-invalid', 'true');
  });
});

test.describe('Contact bo\'limi: server xatosi', () => {
  test.use({ allowedConsoleErrors: [/status of 500/] });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToSection(page, 'contact');
  });

  test('server xatosi: inline xabar, telefon havolasi, ma\'lumot saqlanadi', async ({ page, emailjs }) => {
    emailjs.status = 500;
    const form = page.locator('#contact form');
    await form.locator('input[name=name]').fill('Xato Test');
    await form.locator('input[name=phone]').fill('+998 90 000 00 00');
    await form.getByRole('button', { name: t.contact.btnEstimate }).click();
    const alert = form.getByRole('alert');
    await expect(alert).toContainText(t.contact.errorMsg);
    await expect(alert.locator('a[href^="tel:"]')).toBeVisible();
    await expect(form.locator('input[name=name]')).toHaveValue('Xato Test');
  });
});
