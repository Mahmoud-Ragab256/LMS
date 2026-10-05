import type { ThemeType, RegisterNameType, LoginNameType, CourseCategoryType, CourseLevelType, AssessmentType, QuestionType } from "../types";


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
  teacherId: number;
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

export interface ITeacherRes {
  id: number;
  username: string;
  email?: string;
  password?: string;
  phone?: string;
  imgUrl: string;
  active: boolean;
  subject: CourseCategoryType;
  coursesCount?: number;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export interface IVideo {
  _id: string;
  courseId: number;
  order: number;
  title: string;
  url: string;
  duration: number;
  resolution: string;
  size?: number;
  type?: 'video';
  createdAt: Date | string;
  updatedAt: Date | string;
}


export interface IMatchPair {
  left: string;
  right: string;
}

export interface IQuestion {
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
  modelAnswer?: string;
  pairs?: IMatchPair[];
  points: number;
}


export interface IAssessment {
  _id: string;
  courseId: number;
  order: number;
  assessmentType: AssessmentType;
  title: string;
  questions: IQuestion[];
  timeLimit: number;
  passingScore: number;
  type?: 'quiz' | 'exam';
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeacherRes {
  id: number;
  username: string;
  email?: string;
  password?: string;
  phone?: string;
  imgUrl: string;
  active: boolean;
  subject: CourseCategoryType;
  coursesCount?: number;
  updatedAt: Date | string;
  createdAt: Date | string;
}