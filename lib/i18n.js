import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationVI from './locales/vi/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  vi: {
    translation: translationVI
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'vi', // Default language is Vietnamese
    lng: 'vi', // Set default language
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Cache selected language in localStorage
    },

    interpolation: {
      escapeValue: false // React already does escaping
    },

    react: {
      useSuspense: false // Disable suspense for SSR compatibility
    }
  });

export default i18n;
