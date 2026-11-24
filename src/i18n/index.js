import uz from '../locales/uz/translation.json';
import ru from '../locales/ru/translation.json';
import en from '../locales/en/translation.json';
import servicesUz from '../locales/uz/services.json';
import servicesRu from '../locales/ru/services.json';
import servicesEn from '../locales/en/services.json';

/** @typedef {'uz' | 'ru' | 'en'} Locale */

/** @type {Locale[]} */
export const LOCALES = ['uz', 'ru', 'en'];
export const DEFAULT_LOCALE = 'uz';

// Til tanlovi shu kalit ostida saqlanadi (Navbar yozadi, bosh sahifadagi skript o'qiydi)
export const LANG_STORAGE_KEY = 'mehrzod_lang';

/** @type {Record<string, { label: string, short: string, ogLocale: string }>} */
export const LOCALE_META = {
  uz: { label: "O'zbek", short: 'UZ', ogLocale: 'uz_UZ' },
  ru: { label: 'Русский', short: 'RU', ogLocale: 'ru_RU' },
  en: { label: 'English', short: 'EN', ogLocale: 'en_US' },
};

const dictionaries = { uz, ru, en };
const serviceDictionaries = { uz: servicesUz, ru: servicesRu, en: servicesEn };

export function getDictionary(lang) {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE];
}

/** Xizmat sahifalari matnlari (src/locales/<til>/services.json) */
export function getServiceDictionary(lang) {
  return serviceDictionaries[lang] ?? serviceDictionaries[DEFAULT_LOCALE];
}

/**
 * Tilga mos yo'l: localizedPath('ru', 'privacy/') -> '/ru/privacy/'.
 * O'zbekcha (standart) til prefikssiz: localizedPath('uz') -> '/'.
 */
export function localizedPath(lang, path = '') {
  const prefix = lang === DEFAULT_LOCALE ? '/' : `/${lang}/`;
  return prefix + path.replace(/^\/+/, '');
}

/** Til almashtirgich uchun ro'yxat: har bir til uchun shu sahifaning tarjimasiga havola */
export function getLanguageLinks(currentLang, path = '') {
  return LOCALES.map((code) => ({
    code,
    label: LOCALE_META[code].label,
    short: LOCALE_META[code].short,
    href: localizedPath(code, path),
    current: code === currentLang,
  }));
}
