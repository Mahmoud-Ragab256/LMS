import { NavLink } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/useLanguage';
import { FaGraduationCap } from "react-icons/fa";
import { PiMoonDuotone } from "react-icons/pi";
import { BsFillSunFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Button from './ui/Button';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { t, currentLang, changeLanguage } = useLanguage();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const hidden = isHidden ? `hidden` : null;

  return (
    <header dir='ltr' className="fixed w-full z-1000 h-20 flex items-center justify-between p-4 px-8 bg-white dark:bg-dark-bg text-dark-bg dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">
      <NavLink to='/' className='flex items-center gap-2'>
        <span className='flex justify-center items-center w-10 h-10 rounded-full bg-primary text-2xl text-white'><FaGraduationCap /></span>
        <h1 className="text-lg font-bold text-primary">EDU FLOW</h1>
      </NavLink>

      <div>
        <IoMenu className='text-3xl cursor-pointer md:hidden' onClick={() => setIsHidden(false)} />
        <div className="hidden md:flex items-center gap-5">
          <div className='flex items-center gap-2 border border-dark-bg text-dark-bg  dark:border-gray-300 dark:text-gray-300 p-1 px-3 rounded-full'>
            <input name='search' placeholder={t("search")} id='search' className='outline-0' />
            <label htmlFor='search'><IoIosSearch /></label>
          </div>
          <nav className="flex items-center gap-5">
            <NavLink to='explore' className='hover:text-primary transition duration-250'>{t("explore")}</NavLink>
            {isAuthenticated ? <NavLink to='my-learning' className='hover:text-primary transition duration-250'>{t("my learning")}</NavLink> : null}



          </nav>
          <div className='flex items-center gap-2'>
            <Button
              onClick={toggleTheme}
              className='btn-sm p-1 bg-transparent text-secondary text-xl'
            >
              {theme === 'light' ? <PiMoonDuotone /> : <BsFillSunFill />}
            </Button>

            <Button
              onClick={() => changeLanguage(currentLang === 'ar' ? 'en' : 'ar')}
              className="btn-sm btn-secondary"
            >
              {currentLang === 'ar' ? 'EN' : 'AR'}
            </Button>

            {isAuthenticated ? <NavLink to='/login'><Button className='btn-sm bg-red-600'
              onClick={() => logout()}>{t('logout')}</Button></NavLink>
              : <NavLink to='/login' ><Button className='btn-outline btn-sm '>{t('login')}</Button></NavLink>}
          </div>
        </div>
      </div>
      <div className={`fixed top-0 right-0 flex flex-col items-end gap-5 p-5 ${hidden} bg-white dark:bg-gray-900 dark:text-gray-300 h-full z-50 border-l border-gray-200 dark:border-gray-700`}>
        <div className='flex items-center justify-between w-full'>
          <IoCloseSharp className='text-2xl cursor-pointer' onClick={() => setIsHidden(true)} />
          <div className='flex items-center gap-2'>
            <Button
              onClick={toggleTheme}
              className='btn-sm p-1 bg-transparent text-secondary text-xl'
            >
              {theme === 'light' ? <PiMoonDuotone /> : <BsFillSunFill />}
            </Button>

            <Button
              onClick={() => changeLanguage(currentLang === 'ar' ? 'en' : 'ar')}
              className="btn-sm btn-secondary"
            >
              {currentLang === 'ar' ? 'EN' : 'AR'}
            </Button>
          </div>

        </div>
        <div className='flex items-center gap-2 border border-dark-bg text-dark-bg dark:border-gray-300 dark:text-gray-300 p-1 px-3 rounded-full'>
          <input name='search' placeholder={t("search")} id='search' className='outline-0' />
          <label htmlFor='search'><IoIosSearch /></label>
        </div>
        <nav className="flex flex-col items-end gap-3">
          <NavLink to='explore' className='hover:text-primary transition duration-250'>{t("explore")}</NavLink>
          {isAuthenticated ? <NavLink to='my-learning' className='hover:text-primary transition duration-250'>{t("my learning")}</NavLink> : null}



        </nav >
        {isAuthenticated ? <NavLink to='/login'><Button className='btn-sm bg-red-600'
          onClick={() => logout()}>{t('logout')}</Button></NavLink>
          : <NavLink to='/login' ><Button className='btn-outline btn-sm '>{t('login')}</Button></NavLink>}
      </div>
    </header>
  );
}