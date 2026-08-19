import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/useLanguage';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, currentLang, changeLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-bold">{t('welcome')}</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <button
          onClick={() => changeLanguage(currentLang === 'ar' ? 'en' : 'ar')}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {currentLang === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>
    </header>
  );
}