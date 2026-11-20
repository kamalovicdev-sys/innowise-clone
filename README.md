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
- **Privacy Policy / Terms:** `src/data/site.js` → `LEGAL_PAGES` (sahifalar hali yo'q).
- **Aloqa oynasini ochish:** istalgan elementga `data-open-contact` atributini qo'shing.

### Qaysi qism JS ishlatadi

Hero, Benefits, Services, Stats va Footer tayyor HTML bo'lib chiqadi va JS ishlatmaydi. Navbar va ContactModal sahifa ochilishi bilan, Expertise, Portfolio, FAQ va Contact esa ekranga kirganda jonlanadi (`client:visible`).

### Til tanlovi

Til almashtirgich oddiy havolalardan iborat. Tanlov `localStorage`da (`mehrzod_lang`) saqlanadi. Ruscha yoki inglizchani tanlagan foydalanuvchi `/` ga qaytsa, uning tiliga yo'naltiriladi. Reklama uchun `mehrzod.uz/?lng=ru` havolalari ham ishlaydi.
