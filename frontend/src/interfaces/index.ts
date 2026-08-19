import type { ThemeType } from "../types";


export interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}