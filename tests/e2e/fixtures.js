// Umumiy test yordamchilari.
// - Tashqi xizmatlar (Google Ads, Google Maps) bo'sh javob bilan almashtiriladi: testlar internetga bog'liq emas.
// - EmailJS so'rovlari ushlab qolinadi: haqiqiy xat yuborilmaydi.
// - Konsoldagi JS xatolari yig'iladi va har bir test oxirida tekshiriladi.
import { test as base, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

export const dict = Object.fromEntries(
  ['uz', 'ru', 'en'].map((lang) => [
    lang,
    JSON.parse(readFileSync(new URL(`../../src/locales/${lang}/translation.json`, import.meta.url), 'utf8')),
  ])
);

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'POST, OPTIONS',
};

export const test = base.extend({
  // Ataylab kutilgan konsol xatolari (masalan 404/500 testlarida brauzer yozadigan "Failed to load resource")
  allowedConsoleErrors: [[], { option: true }],

  // EmailJS'ga ketgan so'rovlar ro'yxati; javob kodini emailjs.status orqali o'zgartirish mumkin
  emailjs: async ({ page }, use) => {
    const state = { status: 200, requests: [] };
    await page.route('https://api.emailjs.com/**', async (route) => {
      const request = route.request();
      if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      state.requests.push(request.postDataJSON());
      return route.fulfill({
        status: state.status,
        headers: { ...CORS, 'content-type': 'text/plain' },
        body: state.status === 200 ? 'OK' : 'Server error',
      });
    });
    await use(state);
  },

  page: async ({ page, allowedConsoleErrors }, use) => {
    await page.route(/googletagmanager\.com|doubleclick\.net|google\.com\/pagead/, (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
    );
    await page.route(/google\.com\/maps/, (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: '<html></html>' })
    );

    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().startsWith('Contact form: sending failed')) errors.push(msg.text());
    });

    await use(page);
    const unexpected = errors.filter((text) => !allowedConsoleErrors.some((pattern) => pattern.test(text)));
    expect(unexpected, 'konsolda JS xatolari bo\'lmasligi kerak').toEqual([]);
  },
});

export { expect };

// client:visible orollari ekranga kirganda jonlanadi: bo'limga aylantirib, hydration tugashini kutamiz
export async function scrollToSection(page, id) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  // Astro orol jonlangach <astro-island> dan "ssr" atributini olib tashlaydi
  await page.waitForFunction((sel) => {
    const island = document.querySelector(sel)?.closest('astro-island');
    return island && !island.hasAttribute('ssr');
  }, `#${id}`);
}

// Sahifadagi barcha orollar (Navbar, ContactModal kabi client:load) jonlanishini kutish
export async function waitForHydration(page) {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('astro-island[client="load"]')].every((island) => !island.hasAttribute('ssr'))
  );
}
