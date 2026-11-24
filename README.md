# Mehrzod Business Group — sayt

[mehrzod.uz](https://mehrzod.uz) uchun landing sahifa: ma'lumotlar tahlili, BI va biznes konsalting xizmatlari.

- **Stack:** [Astro 7](https://astro.build) (statik HTML) + React 19 (faqat interaktiv qismlar uchun)
- **Tillar:** o'zbekcha `/` (standart), ruscha `/ru/`, inglizcha `/en/`
- **Sahifalar:** bosh sahifa, xizmat sahifalari (`/power-bi/`, `/1c-analytics/`, `/metabase/`), maxfiylik siyosati, 404
- **Forma:** EmailJS orqali email yuboriladi

## Ishga tushirish

Node.js **22.23.4** yoki undan yangi versiya kerak.

```bash
npm install
cp .env.example .env   # EmailJS kalitlarini yozing
npm run dev            # http://localhost:3000
```

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Ishlab chiqish serveri |
| `npm run build` | `dist/` ga tayyor sayt yig'ish |
| `npm run build:netlify` | Deploy uchun: avval lint va tip tekshiruvi, keyin build. Xato bo'lsa `dist/` yangilanmaydi |
| `npm run preview` | Yig'ilgan saytni lokal ko'rish |
| `npm run lint` | ESLint (accessibility qoidalari bilan) |
| `npm run check` | Astro va tip tekshiruvi |
| `npm run test:e2e` | Playwright testlari: tillar, forma, modal, bo'limlar, mobil panel, 404, maxfiylik sahifasi, xizmat sahifalari (tizimda Google Chrome bo'lishi kerak) |
| `npm run og` | Ijtimoiy tarmoqlar uchun ulashish rasmlarini (`public/og/og-*.jpg`) qayta yaratish. Hero sarlavhasi o'zgarsa ishga tushiring |

## Deploy (Netlify)

Sayt GitHub orqali avtomatik yangilanadi: Netlify ulangan branch'ga push qilinganda u o'zi `npm run build:netlify` (lint + tip tekshiruvi + build) ni ishga tushiradi va `dist/` ni chiqaradi. Sozlamalar: `netlify.toml`.

- Push'dan oldin lokal tekshiring: `npm run build:netlify` va `npm run test:e2e`.
- **EmailJS kalitlari** Netlify'da bo'lishi shart: Site configuration → Environment variables → `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY`. `.env` fayli GitHub'ga yuklanmaydi. Kalit bo'lmasa build xato beradi va eski versiya ishlashda davom etadi.
- Build xatosi bo'lsa: Netlify → Deploys → oxirgi deploy → "Deploy log".

Deploy'dan keyin quyidagilarni tekshiring:
- `https://mehrzod.uz/`, `/ru/`, `/en/` va xizmat sahifalari (`/power-bi/`, `/ru/1c-analytics/` va h.k.) ochiladi. `/sitemap.xml` va `/robots.txt` mavjud.
- Havolani Telegramda ulashing: og:image rasmi chiqishi kerak.
- Google Search Console: eski `/sitemap-index.xml` yozuvini o'chiring, `/sitemap.xml` ni qayta yuboring. Yangi sahifalarni "URL Inspection" orqali indekslashga yuboring.
- Google Rich Results Test (search.google.com/test/rich-results): kompaniya ma'lumoti va xizmat sahifalaridagi breadcrumb (JSON-LD) xatosiz.
- EmailJS: Account → Security → Allowed origins ga `https://mehrzod.uz` qo'shing.

`public/_headers` fayli Netlify'ga keshlash qoidalarini (`/_astro/*` 1 yil) va xavfsizlik headerlarini beradi.

`404.html`, `robots.txt` va `sitemap.xml` (`src/pages/sitemap.xml.js`) avtomatik yaratiladi. Build vaqtida `.env` fayli bo'lishi shart. Kalit yetishmasa build xato beradi, shu sababli forma kalitsiz holda saytga chiqib qolmaydi.

## Tuzilma

```
src/
  pages/              # Route'lar: index.astro (uz), [service].astro (xizmat sahifalari), ru/, en/, 404.astro
  layouts/            # BaseLayout: <head>, SEO, hreflang, gtag, scroll-reveal
  components/
    home/HomePage.astro   # Bosh sahifa bo'limlarini yig'adi
    services/ServicePage.astro  # Xizmat sahifasi (Power BI, 1C analitikasi, Metabase)
    layout/               # Navbar (interaktiv), Footer (statik)
    sections/             # Hero, Trust, Problems, Solutions, Process, Industries, Integrations, FAQ, Contact,
                          # Deliverables va RelatedServices (xizmat sahifalari uchun)
    ui/                   # ContactForm (umumiy forma + hook), ContactModal (yagona modal), ProblemFlow
  data/               # Tilga bog'liq bo'lmagan ma'lumotlar: kontaktlar, ijtimoiy tarmoqlar, bo'lim ro'yxatlari
  i18n/               # Tarjimalar va til yordamchilari
  locales/{uz,ru,en}/translation.json   # Bosh sahifa va umumiy matnlar
  locales/{uz,ru,en}/services.json      # Xizmat sahifalari matnlari
  lib/                # EmailJS yuborish, tablar uchun klaviatura boshqaruvi
  styles/global.css
```

### Muhim joylar

- **Matnlar:** `src/locales/*/translation.json`. Uchala faylda kalitlar bir xil bo'lishi kerak.
- **Telefon, email, xarita, koordinata:** `src/data/site.js` → `CONTACT`
- **Sahifa formati:** asosiy bo'limlar "Muammo → Oqibati → Yechimimiz" tuzilishida (`ui/ProblemFlow`). Muammo kartalari: `src/data/sections.js` → `PROBLEMS`, matni `problems.items.<key>`. Har bir kartaning manzili `/#problem-<key>` (masalan `/#problem-inventory`), uni reklama sitelink'larida ishlatish mumkin.
- **Yechimlar:** `SOLUTIONS` (har birida `solves`: qaysi muammolarni hal qiladi), qo'shimcha xizmatlar: `EXTRA_SERVICES`. Kartaning manzili `/#solution-<key>`.
- **Sohalar:** `INDUSTRIES`, matni `industries.items.<id>`. Rasmlar ixtiyoriy: `src/assets/industries/<id>.jpg` (batafsil: shu papkadagi README). Oltitasi ham qo'yilmaguncha ikonkali panel ko'rsatiladi.
- **Integratsiyalar:** `INTEGRATION_GROUPS`. Tilga qarab nomi farq qiladigan tizim obyekt bilan yoziladi: `{ default: '1C', ru: '1С' }`.
- **Ijtimoiy tarmoqlar:** `src/data/site.js` → `SOCIAL_LINKS`. `href: null` bo'lgan tarmoq saytda ko'rsatilmaydi.
- **Telegram / WhatsApp (to'g'ridan-to'g'ri yozish):** `src/data/site.js` → `CONTACT.telegram`, `CONTACT.whatsapp`. Havola yozilsa, tugmalar Contact bo'limida va mobil panelda paydo bo'ladi.
- **Ishonch bloki** (raqamlar, mijoz logotiplari, mijoz fikrlari): `src/data/trust.js`. Hammasi bo'sh bo'lsa, blok saytda ko'rinmaydi. Faqat haqiqiy ma'lumot kiriting.
- **Keys natijalari:** tarjima faylida `industries.items.<id>.metrics = [{ "value": "−23%", "label": "..." }]`. Bu maydon bo'lmasa, natijalar qatori chiqmaydi.
- **Privacy Policy / Terms:** `src/data/site.js` → `LEGAL_PAGES` (maxfiylik siyosati e'lon qilingan, shartlar sahifasi hali yo'q).
- **Aloqa oynasini ochish:** istalgan elementga `data-open-contact` atributini qo'shing.
- **Scroll animatsiyasi ("yig'ilish"):** elementga `data-assemble="left|right|up|down|zoom"` qo'shing, u ekranga kirganda shu tomondan kelib o'z joyiga tushadi. Birga kirgan elementlar navbatma-navbat yig'iladi. Grid uchun tomonni `src/lib/assemble.js` → `gridSide(index, ustunlar)` hisoblaydi. Stillar `global.css`, skript `BaseLayout.astro`. `key` bilan qayta yaratiladigan React elementlariga qo'ymang, ularni doimiy o'ramga qo'ying (Industries paneliga qarang).
- **Yechimlar kartalarida 3D effekt:** `data-tilt` atributi + `src/components/ui/TiltCards/TiltCards.astro` skripti (sichqoncha ustida egilish, qatlamlar chuqurligi, nur). Faqat sichqonchali qurilmalarda, "harakatni kamaytirish" o'chiq bo'lsa.
- **Hero dashbordi:** `HeroDashboard.jsx` (barcha tillarda inglizcha demo), harakati: `HeroDashboardLive.astro` (KPI sanash, Revenue → Channels → Inventory almashishi har 4.5 s). Ekrandan chiqqanda to'xtaydi. "Harakatni kamaytirish" yoqilgan bo'lsa, animatsiya o'chadi.
- **SEO kalit so'zlari:** title va description: `meta` (OG rasmlardagi ustki yozuv title'ning `|` gacha qismidan olinadi, o'zgartirsangiz `npm run og`).

### Xizmat sahifalari

- Ro'yxat: `src/data/services.js` → `SERVICE_PAGES` (`slug`, muammo va "Nima olasiz" kartalari ikonkalari bilan). Yangi sahifa qo'shilsa, u uchala tilda, sitemap'da, footer'da va boshqa xizmat sahifalarining "Boshqa xizmatlar" bo'limida o'zi paydo bo'ladi.
- Matn: `src/locales/<til>/services.json` → `pages.<key>` (meta, hero, muammolar, "Nima olasiz", FAQ). Qisqa nomi: `translation.json` → `servicePages.<key>`.
- Jarayon, integratsiyalar va aloqa bo'limlari bosh sahifa bilan bir xil matndan olinadi.
- Bosh sahifadagi Yechimlar kartasidan havola: `src/data/sections.js` → `SOLUTIONS[].pages`.
- Google Ads uchun: har bir reklama guruhini mos sahifaga yo'naltiring (masalan "внедрение Power BI" → `/ru/power-bi/`).

### Maxfiylik siyosati

- Matn: `src/content/legal/privacy.{uz,ru,en}.md` (oddiy Markdown). Matnni o'zgartirsangiz, yuqoridagi `updated` sanasini ham yangilang.
- **E'lon qilingan** (2026-11-24): `src/data/site.js` → `LEGAL_PAGES.privacy = 'privacy/'`. Shu sababli footer havolasi, sitemap yozuvi va formalardagi rozilik matni ko'rsatiladi. `null` qilinsa, sahifa yana qoralamaga aylanadi (noindex, havolasiz, "qoralama" belgisi bilan).
- Operator: "MEHRZOD BUSINESS GROUP" MChJ, STIR 304447183. Saqlash muddati: ish yakunlangandan keyin 1 yil. So'rovlarga javob: 10 ish kuni.
- **Yurist bilan kelishilishi kerak:** O'RQ-547 Qonunining 27¹-moddasi O'zbekiston fuqarolarining shaxsiy ma'lumotlarini O'zbekistondagi serverlarda saqlashni talab qiladi. Hozir forma ma'lumotlari EmailJS va Gmail (xorijiy serverlar) orqali o'tadi, bu siyosatning 4-bo'limida ochiq ko'rsatilgan.

### Dizayn tizimi ("Lojuvard")

Barcha ranglar, shriftlar, masofalar, burchaklar va soyalar `src/styles/tokens.css` faylida CSS o'zgaruvchilari sifatida saqlanadi. Komponentlarda rang yoki o'lchamni to'g'ridan-to'g'ri yozmang, tokendan foydalaning (masalan `var(--color-primary)`).

| Token | Qiymat | Vazifasi |
|---|---|---|
| `--color-ink` | `#0e1a3b` | Asosiy matn, footer foni |
| `--color-primary` | `#1f3a93` | Tugmalar, havolalar (lojuvard) |
| `--color-accent` | `#0e9aa7` | Urg'u, to'q fondagi detallar (firuza) |
| `--color-surface` | `#f3f6fa` | Muqobil bo'lim foni, kartalar |
| `--color-text-muted` | `#51607e` | Ikkinchi darajali matn |

- **Shriftlar:** sarlavhalarda Manrope, matnda Inter. Ikkalasi ham `@fontsource-variable` orqali o'z serverimizdan yuklanadi va kirill harflarini qo'llab-quvvatlaydi.
- **Komponentlar:**
  - `ui/Button`: `primary`, `secondary` va `dark` ko'rinishlari, `md` va `lg` o'lchamlari, `href` berilsa havola bo'ladi.
  - `ui/SectionHeader`: bo'lim sarlavhasi va tavsifi.
  - `ui/Logo`: `light` va `dark` ko'rinishlari.
  - Global `.container` va `.section` klasslari.
- **Logo:** "mehr" belgisi (sakkiz qirrali quyosh yulduzi va o'suvchi ustunlar) hozircha konsept. Rasmiy logo tayyor bo'lsa, `ui/Logo/Logo.jsx` va `public/favicon.*` fayllarini almashtiring.

### Qaysi qism JS ishlatadi

Hero, Problems, Solutions, Process, Integrations va Footer tayyor HTML bo'lib chiqadi va JS ishlatmaydi. Navbar va ContactModal sahifa ochilishi bilan, Industries, FAQ va Contact esa ekranga kirganda jonlanadi (`client:visible`).

### Til tanlovi

Til almashtirgich oddiy havolalardan iborat. Tanlov `localStorage`da (`mehrzod_lang`) saqlanadi. Ruscha yoki inglizchani tanlagan foydalanuvchi `/` ga qaytsa, uning tiliga yo'naltiriladi. Reklama uchun `mehrzod.uz/?lng=ru` havolalari ham ishlaydi.
