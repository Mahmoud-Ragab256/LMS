import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { IThemeContext } from "../interfaces";
import type { ThemeType } from "../types";

interface IProps {
  children: ReactNode;
}


const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const ThemeProvider = ({ children }: IProps) => {

  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('theme') as ThemeType) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )

}
export function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
export default ThemeProvider;