export interface ITeacher {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  img_url: string;
  active: boolean;
  updated_at: Date | string;
  created_at: Date | string;
}

export interface ICreateTeacher {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUpdateTeacher {
  username?: string;
  email?: string;
  phone?: string;
  img_url?: string;
  active?: boolean;
}

// ---------------- Student ---------------

export interface IStudent {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  img_url: string;
  active: boolean;
  nid: string; //National ID
  updated_at: Date | string;
  created_at: Date | string;
}

export interface ICreateStudent {
  username: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
}

export interface IUpdateStudent {
  username?: string;
  email?: string;
  phone?: string;
  img_url?: string;
  active?: boolean;
}


// ---------------- Courses ---------------

export interface ICourse {
  id: number;
  teacher_id: number;
  price: number;
  description: string;
  img_url: string;
  updated_at: Date | string;
  created_at: Date | string;
}

export interface ICreateCourse {
  teacher_id: number;
  price: number;
  description: string;
  img_url: string;
}

export interface IUpdateCourse {
  price?: number;
  description?: string;
  img_url?: string;
}