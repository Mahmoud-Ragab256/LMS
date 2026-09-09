import type { ThemeType, RegisterNameType, LoginNameType, CourseCategoryType, CourseLevelType } from "../types";


export interface IThemeContext {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  logout: () => void;
  checkAuth: () => boolean;
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

export interface ICourseRes {
  id: number;
  teacher_id: number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  category: CourseCategoryType;
  level: CourseLevelType;
  teacherName: string;
  teacherImg: string;
  updatedAt: Date | string;
  createdAt: Date | string;
}