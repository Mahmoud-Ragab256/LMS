import { NavLink } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/useLanguage';
import { FaGraduationCap } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { PiMoonDuotone } from "react-icons/pi";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import Button from './ui/Button';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, currentLang, changeLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between p-4 px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <NavLink to='/' className='flex items-center gap-2'>
        <span className='flex justify-center items-center w-10 h-10 rounded-full bg-primary text-2xl text-white'><FaGraduationCap /></span>
        <h1 className="text-lg font-bold text-primary">EDU FLOW</h1>
      </NavLink>

      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-2">
          <NavLink to='explore' className='hover:text-primary transition duration-250'>Explore</NavLink>
          <NavLink to='my-learning' className='hover:text-primary transition duration-250'>My Learning</NavLink>
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

          <NavLink to='/login' ><Button className='btn-sm bg-transparent border border-primary text-primary hover:bg-primary hover:text-white'>{t('login')}</Button></NavLink>
          {/* <NavLink to='/register'><Button className='btn-sm bg-transparent border border-primary text-primary'>{t('register')}</Button></NavLink> */}
        </div>
      </div>
    </header>
    // <header className="flex items-center justify-between p-4 px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
    //   <NavLink to='/' className='flex items-center gap-2'>
    //     <span className='flex justify-center items-center w-10 h-10 rounded-full bg-primary text-2xl text-white'><FaGraduationCap /></span>
    //     <h1 className="text-lg font-bold text-primary">EDU FLOW</h1>
    //   </NavLink>

    //   <div className="flex items-center gap-3">
    //     <nav className="flex items-center gap-3">
    //       <NavLink to='explore' className='hover:text-primary transition duration-250'>Explore</NavLink>
    //       <NavLink to='my-learning' className='hover:text-primary transition duration-250'>My Learning</NavLink>
    //     </nav>
    //     <div className='flex items-center gap-2'>
    //       <button
    //         onClick={toggleTheme}
    //         className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
    //       >
    //         {theme === 'light' ? '🌙' : '☀️'}
    //       </button>

    //       <button
    //         onClick={() => changeLanguage(currentLang === 'ar' ? 'en' : 'ar')}
    //         className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
    //       >
    //         {currentLang === 'ar' ? 'EN' : 'AR'}
    //       </button>
    //     </div>
    //     <div className='flex items-center gap-2'>
    //       <NavLink to='/login' ><Button className='btn-sm btn-secondary'>{t('login')}</Button></NavLink>
    //       <NavLink to='/register'><Button className='btn-sm bg-transparent border border-secondary text-secondary'>{t('register')}</Button></NavLink>
    //     </div>
    //   </div>
    // </header>
  );
}