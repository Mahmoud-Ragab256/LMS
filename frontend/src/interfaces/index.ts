import type { ThemeType } from "../types";


export interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface IInput {
  label?: string;
  name: string;
  id: string;
  placeholder: string;
  type: string;
}