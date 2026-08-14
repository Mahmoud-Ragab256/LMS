export interface ITeacher {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  imgUrl: string;
  active: boolean;
  updated_at: Date | string;
  created_at: Date | string;
}

export interface ICreateTeacher {
  username: string;
  email: string;
  hashedPassword: string;
  phone: string;
}

export interface IUpdateTeacher {
  username?: string;
  email?: string;
  phone?: string;
  imgUrl?: string;
  active?: boolean;
  updated_at?: Date | string;
}