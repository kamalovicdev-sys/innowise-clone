import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationUZ from './locales/uz/translation.json';
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  uz: { translation: translationUZ },
  ru: { translation: translationRU },
  en: { translation: translationEN }
};

// <html lang="..."> ni joriy til bilan bir xil saqlaymiz (SEO va ekran o'quvchilar uchun)
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['uz', 'ru', 'en'],
    // Birinchi tashrifda o'zbek tili. `lng` qo'yilmaydi, aks holda detector ishlamaydi
    fallbackLng: 'uz',
    load: 'languageOnly',
    detection: {
      // ?lng=ru havolasi (masalan, reklama uchun) yoki foydalanuvchining oldingi tanlovi.
      // Brauzer tili ataylab hisobga olinmaydi: standart til o'zbekcha bo'lishi kerak.
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lng',
      // Yangi kalit: eski versiya `lng: 'ru'` tufayli har bir tashrifchiga 'i18nextLng' = 'ru' yozib qo'ygan.
      // Eski kalitni o'qisak, avval kirganlar o'zbekcha standartni hech qachon ko'rmaydi.
      lookupLocalStorage: 'mehrzod_lang',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
