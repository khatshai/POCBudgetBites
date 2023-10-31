import i18n from 'i18next';
import en from './en.json';
import zh from './zh.json';
import mr from './mr.json';
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  mr:{
    translation:mr,
  }
};

i18n
.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});

export default i18n; 