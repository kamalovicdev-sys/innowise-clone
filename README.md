# Mehrzod Business Group — sayt

[mehrzod.uz](https://mehrzod.uz) uchun landing sahifa: ma'lumotlar tahlili, BI va biznes konsalting xizmatlari.

- **Stack:** [Astro 7](https://astro.build) (statik HTML) + React 19 (faqat interaktiv qismlar uchun)
- **Tillar:** o'zbekcha `/` (standart), ruscha `/ru/`, inglizcha `/en/`
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
| `npm run preview` | Yig'ilgan saytni lokal ko'rish |
| `npm run lint` | ESLint (accessibility qoidalari bilan) |
| `npm run check` | Astro va tip tekshiruvi |

## Deploy (Netlify)

1. `npm run build`
2. `dist/` papkasini Netlify'ning **Deploys** sahifasiga sudrab tashlang.

`404.html`, `robots.txt` va `sitemap.xml` (`src/pages/sitemap.xml.js`) avtomatik yaratiladi. Build vaqtida `.env` fayli bo'lishi shart. Kalit yetishmasa build xato beradi, shu sababli forma kalitsiz holda saytga chiqib qolmaydi.

## Tuzilma

```
src/
  pages/              # Route'lar: index.astro (uz), ru/, en/, 404.astro
  layouts/            # BaseLayout: <head>, SEO, hreflang, gtag, scroll-reveal
  components/
    home/HomePage.astro   # Bosh sahifa bo'limlarini yig'adi
    layout/               # Navbar (interaktiv), Footer (statik)
    sections/             # Hero, Benefits, Services, Stats, Expertise, Portfolio, FAQ, Contact
    ui/                   # ContactForm (umumiy forma + hook), ContactModal (yagona modal)
  data/               # Tilga bog'liq bo'lmagan ma'lumotlar: kontaktlar, ijtimoiy tarmoqlar, bo'lim ro'yxatlari
  i18n/               # Tarjimalar va til yordamchilari
  locales/{uz,ru,en}/translation.json
  lib/                # EmailJS yuborish, tablar uchun klaviatura boshqaruvi
  styles/global.css
```

### Muhim joylar

- **Matnlar:** `src/locales/*/translation.json`. Uchala faylda kalitlar bir xil bo'lishi kerak.
- **Telefon, email, xarita:** `src/data/site.js` → `CONTACT`
- **Ijtimoiy tarmoqlar:** `src/data/site.js` → `SOCIAL_LINKS`. `href: null` bo'lgan tarmoq saytda ko'rsatilmaydi.
- **Telegram / WhatsApp (to'g'ridan-to'g'ri yozish):** `src/data/site.js` → `CONTACT.telegram`, `CONTACT.whatsapp`. Havola yozilsa, tugmalar Contact bo'limida va mobil panelda paydo bo'ladi.
- **Ishonch bloki** (raqamlar, mijoz logotiplari, mijoz fikrlari): `src/data/trust.js`. Hammasi bo'sh bo'lsa, blok saytda ko'rinmaydi. Faqat haqiqiy ma'lumot kiriting.
- **Keys natijalari:** tarjima faylida `portfolio.industries.<id>.metrics = [{ "value": "−23%", "label": "..." }]`. Bu maydon bo'lmasa, natijalar qatori chiqmaydi.
- **Privacy Policy / Terms:** `src/data/site.js` → `LEGAL_PAGES` (sahifalar hali yo'q).
- **Aloqa oynasini ochish:** istalgan elementga `data-open-contact` atributini qo'shing.

### Maxfiylik siyosati

- Matn: `src/content/legal/privacy.{uz,ru,en}.md` (oddiy Markdown). Yuqoridagi `updated` sanasini ham yangilang.
- Hozir **qoralama**: sahifa `/privacy/`, `/ru/privacy/`, `/en/privacy/` manzillarida ochiladi, lekin indekslanmaydi, sitemap'da yo'q va saytda havola qilinmagan. Sahifa yuqorisida "qoralama" belgisi turadi.
- Yurist tasdiqlagach `src/data/site.js` faylida `LEGAL_PAGES.privacy = 'privacy/'` deb yozing. Shunda footer havolasi, sitemap yozuvi va formalardagi rozilik matni o'zi paydo bo'ladi.
- Qoralamadagi `[kvadrat qavs]` joylarini to'ldiring: yuridik nom, STIR, saqlash muddati, javob berish muddati.
- **Yurist bilan kelishilishi kerak:** O'RQ-547 Qonunining 27¹-moddasi O'zbekiston fuqarolarining shaxsiy ma'lumotlarini O'zbekistondagi serverlarda saqlashni talab qiladi. Hozir forma ma'lumotlari EmailJS va Gmail (xorijiy serverlar) orqali o'tadi.

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

Hero, Benefits, Services, Stats va Footer tayyor HTML bo'lib chiqadi va JS ishlatmaydi. Navbar va ContactModal sahifa ochilishi bilan, Expertise, Portfolio, FAQ va Contact esa ekranga kirganda jonlanadi (`client:visible`).

### Til tanlovi

Til almashtirgich oddiy havolalardan iborat. Tanlov `localStorage`da (`mehrzod_lang`) saqlanadi. Ruscha yoki inglizchani tanlagan foydalanuvchi `/` ga qaytsa, uning tiliga yo'naltiriladi. Reklama uchun `mehrzod.uz/?lng=ru` havolalari ham ishlaydi.
