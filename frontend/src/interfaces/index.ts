import type { ThemeType, userNameType } from "../types";


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

export interface IRegisterInput extends IInput {
  name: userNameType;
}