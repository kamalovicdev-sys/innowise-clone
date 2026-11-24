// Sayt bo'ylab ishlatiladigan aloqa ma'lumotlari va havolalar.
// Matnlar (manzil va h.k.) tarjima fayllarida, bu yerda faqat tilga bog'liq bo'lmagan qiymatlar.

export const CONTACT = {
  phone: '+998955209595',
  phoneDisplay: '+998 95 520 95 95',
  email: 'mehrzodgroup@gmail.com',
  // Messenjerlar: to'g'ridan-to'g'ri yozish uchun havola (null bo'lsa tugma ko'rsatilmaydi).
  // Masalan: telegram: 'https://t.me/mehrzod_manager', whatsapp: 'https://wa.me/998955209595'
  telegram: null,
  whatsapp: 'https://wa.me/998955209595',
  // Mall Vega, Shota Rustaveli 150, Toshkent (xarita va tuzilgan ma'lumot uchun koordinata)
  geo: { latitude: 41.2598788, longitude: 69.2238091 },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.250619484291!2d69.2238091!3d41.2598788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a7667710b21%3A0xc478dc0d295f9756!2zTWFsbCDigJxWZWdh4oCd!5e0!3m2!1sen!2s!4v1779699142856!5m2!1sen!2s',
};

// Ijtimoiy tarmoqlar: havola tayyor bo'lganda qiymatni yozing (masalan 'https://t.me/mehrzod').
// null bo'lgan tarmoq footer'da ko'rsatilmaydi, shuning uchun saytda "o'lik" havola qolmaydi.
export const SOCIAL_LINKS = [
  { id: 'telegram', label: 'Telegram', href: null },
  { id: 'instagram', label: 'Instagram', href: null },
  { id: 'linkedin', label: 'LinkedIn', href: null },
];

// Huquqiy sahifalar. Matn: src/content/legal/<sahifa>.<til>.md
// null — sahifa qoralama: /privacy/ manzilida ochiladi, lekin noindex, sitemap'da yo'q, footer'da havola yo'q.
// 'privacy/' deb yozilsa — e'lon qilinadi: footer havolasi, sitemap, formalardagi rozilik yozuvi paydo bo'ladi.
/** @type {Record<string, string | null>} */
export const LEGAL_PAGES = {
  privacy: 'privacy/',
  terms: null,
};
