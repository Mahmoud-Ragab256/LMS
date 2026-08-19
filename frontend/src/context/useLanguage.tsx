import { useTranslation } from 'react-i18next';

type Language = 'ar' | 'en';

interface UseLanguageReturn {
  t: (key: string) => string;
  currentLang: Language;
  changeLanguage: (lang: Language) => void;
}

export function useLanguage(): UseLanguageReturn {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return {
    t,
    currentLang: i18n.language as Language,
    changeLanguage
  };
}