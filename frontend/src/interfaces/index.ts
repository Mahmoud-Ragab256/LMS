import type { ThemeType, RegisterNameType, LoginNameType } from "../types";


export interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  phone: string;
  nid?: string;
}


export interface IInput {
  label?: string;
  name: string;
  id: string;
  placeholder: string;
  type: string;
}

export interface IRegisterInput extends IInput {
  name: RegisterNameType;
}

export interface ILoginInput extends IInput {
  name: LoginNameType;
}
