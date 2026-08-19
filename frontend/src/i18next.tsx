import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locals/arTranslation.json';
import en from './locals/enTranslation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en }
    },
    lng: localStorage.getItem('lang') || 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n