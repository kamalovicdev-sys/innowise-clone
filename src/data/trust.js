// "Bizga ishonch bildirganlar" bloki uchun HAQIQIY ma'lumotlar.
// Hammasi bo'sh bo'lsa blok saytda umuman ko'rinmaydi: o'ylab topilgan raqam yoki mijoz ko'rsatilmaydi.

// Raqamlar. key: 'projects' | 'years' | 'industries' | 'clients' (yozuvi tarjima faylida: trust.stats.<key>)
// Masalan: { key: 'projects', value: '40+' }
export const TRUST_STATS = [];

// Mijoz logotiplari: faylni public/clients/ papkasiga qo'ying (SVG yoki shaffof PNG) va shu yerga yozing.
// Masalan: { name: 'Kompaniya nomi', src: '/clients/kompaniya.svg' }
// Logotipni ishlatishga mijozdan ruxsat olinganiga ishonch hosil qiling.
export const CLIENT_LOGOS = [];

// Mijoz fikrlari (uchala tilda). Masalan:
// { author: 'Ism Familiya', role: { uz: 'Moliya direktori', ru: 'Финансовый директор', en: 'CFO' }, company: 'Kompaniya',
//   quote: { uz: '...', ru: '...', en: '...' } }
export const TESTIMONIALS = [];
