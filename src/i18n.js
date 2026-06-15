import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Uchala til tarjimalarini import qilish
import translationUZ from './locales/uz/translation.json';
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json'; // <--- INGLIZ TILI QO'SHILDI

const resources = {
  en: { translation: translationEN }, // <--- INGLIZ TILI RESURSLARGA QO'SHILDI
  uz: { translation: translationUZ },
  ru: { translation: translationRU }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Sayt yuklanganda birinchi bo'lib Ingliz tili ochiladi (xohishga qarab 'ru' yoki 'uz' ga o'zgartirishingiz mumkin)
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;