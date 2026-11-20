// Ijtimoiy tarmoqlar uchun ulashish rasmlari (og:image, 1200x630) — har bir til uchun bittadan.
// Ishga tushirish: npm run og   (tizimda Google Chrome o'rnatilgan bo'lishi kerak)
// Natija: public/og/og-uz.jpg, og-ru.jpg, og-en.jpg
// Hero sarlavhasi yoki meta title o'zgarsa, qayta ishga tushiring.
import { chromium } from '@playwright/test';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

const fontData = (pkg, file) =>
  readFileSync(join(root, 'node_modules', '@fontsource-variable', pkg, 'files', file)).toString('base64');

const fontFaces = ['latin', 'latin-ext', 'cyrillic']
  .flatMap((subset) => [
    ['Manrope Variable', 'manrope', `manrope-${subset}-wght-normal.woff2`],
    ['Inter Variable', 'inter', `inter-${subset}-wght-normal.woff2`],
  ])
  .map(
    ([family, pkg, file]) =>
      `@font-face { font-family: '${family}'; font-weight: 100 900; src: url(data:font/woff2;base64,${fontData(pkg, file)}) format('woff2'); }`
  )
  .join('\n');

// Silliq egri chiziq (HeroDashboard'dagi bilan bir xil usul)
const VALUES = [42, 48, 45, 55, 52, 63, 60, 70, 68, 78, 75, 86];
const W = 420;
const H = 260;
const px = (i) => 14 + (i * (W - 34)) / (VALUES.length - 1);
const py = (v) => H - 20 - ((v - 30) / 60) * (H - 50);
const pts = VALUES.map((v, i) => [px(i), py(v)]);
const f = ([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`;
let line = `M${f(pts[0])}`;
for (let i = 0; i < pts.length - 1; i += 1) {
  const p0 = pts[i - 1] ?? pts[i];
  const p1 = pts[i];
  const p2 = pts[i + 1];
  const p3 = pts[i + 2] ?? p2;
  line += ` C${f([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${f([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${f(p2)}`;
}
const area = `${line} L${f([px(VALUES.length - 1), H - 20])} L${f([px(0), H - 20])} Z`;
const end = pts[pts.length - 1];

const html = (t) => `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8"><style>
${fontFaces}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; }
.card {
  position: relative; width: 1200px; height: 630px; overflow: hidden;
  display: grid; grid-template-columns: 1fr 460px; align-items: center; gap: 40px;
  padding: 72px 80px;
  background: linear-gradient(135deg, #0e1a3b 0%, #15276a 60%, #1f3a93 100%);
  font-family: 'Inter Variable', sans-serif; color: #ffffff;
}
.card::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(rgb(255 255 255 / 0.08) 1.2px, transparent 1.2px);
  background-size: 26px 26px;
}
.left { position: relative; display: flex; flex-direction: column; height: 100%; }
.logo { display: flex; align-items: center; gap: 16px; }
.logo svg { width: 56px; height: 56px; }
.name { font-family: 'Manrope Variable'; font-weight: 800; font-size: 30px; letter-spacing: 0.06em; line-height: 1; }
.tag { margin-top: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.22em; color: #4fc6cf; }
.eyebrow { margin-top: auto; font-size: 22px; font-weight: 600; color: #4fc6cf; }
h1 { margin-top: 14px; font-family: 'Manrope Variable'; font-weight: 800; font-size: 58px; line-height: 1.08; letter-spacing: -0.02em; text-wrap: balance; }
.domain { margin-top: auto; padding-top: 28px; font-size: 22px; font-weight: 600; color: #a9b4cc; }
.chart { position: relative; padding: 24px; border-radius: 20px; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.12); }
</style></head><body><div class="card">
  <div class="left">
    <div class="logo">
      <svg viewBox="0 0 40 40"><rect fill="#ffffff" x="1" y="1" width="38" height="38" rx="9"/><polyline fill="none" stroke="#1f3a93" stroke-width="4.2" stroke-linecap="square" stroke-linejoin="miter" points="10.5,29 10.5,17 19.5,25 29.5,11 29.5,29"/><rect fill="#0e9aa7" x="8.4" y="31.2" width="23.2" height="2.6" rx="1.3"/></svg>
      <div><div class="name">MEHRZOD</div><div class="tag">BUSINESS GROUP</div></div>
    </div>
    <p class="eyebrow">${t.eyebrow}</p>
    <h1>${t.title}</h1>
    <p class="domain">mehrzod.uz</p>
  </div>
  <div class="chart">
    <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc6cf" stop-opacity="0.45"/><stop offset="1" stop-color="#4fc6cf" stop-opacity="0"/></linearGradient></defs>
      ${[0.25, 0.5, 0.75].map((r) => `<line x1="0" x2="${W}" y1="${(H - 20) * r}" y2="${(H - 20) * r}" stroke="rgb(255 255 255 / 0.12)" stroke-dasharray="4 6"/>`).join('')}
      <path d="${area}" fill="url(#g)"/>
      <path d="${line}" fill="none" stroke="#4fc6cf" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${end[0]}" cy="${end[1]}" r="9" fill="#0e1a3b" stroke="#4fc6cf" stroke-width="5"/>
    </svg>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const lang of ['uz', 'ru', 'en']) {
  const dict = JSON.parse(readFileSync(join(root, 'src', 'locales', lang, 'translation.json'), 'utf8'));
  const eyebrow = dict.meta.title.split('|')[0].trim();
  await page.setContent(html({ lang, eyebrow, title: dict.hero.title }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const file = join(outDir, `og-${lang}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 90 });
  console.log('✓', file.replace(root + '/', ''));
}

await browser.close();
