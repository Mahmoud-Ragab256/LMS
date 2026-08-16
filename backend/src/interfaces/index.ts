import type { enrollmentStatusTypes, paymentStatusTypes } from "../types/index.js";

export interface ITeacher {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  imgUrl: string;
  active: boolean;
  updatedAt: Date | string;
  createdAt: Date | string;
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
  imgUrl?: string;
  active?: boolean;
}

// ---------------- Student ---------------

export interface IStudent {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  imgUrl: string;
  active: boolean;
  nid: string; //National ID
  updatedAt: Date | string;
  createdAt: Date | string;
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
  imgUrl?: string;
  active?: boolean;
}


// ---------------- Courses ---------------

export interface ICourse {
  id: number;
  teacher_id: number;
  price: number;
  description: string;
  imgUrl: string;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export interface ICreateCourse {
  teacherId: number;
  price: number;
  description: string;
  imgUrl: string;
}

export interface IUpdateCourse {
  price?: number;
  description?: string;
  imgUrl?: string;
}


// ---------------- Payments ---------------

export interface IPayment {
  id: number;
  studentId: number;
  courseId: number;
  provider: string;
  providerOrderId?: string | null;
  providerTransactionId?: string | null;
  amount: number;
  currency: string;
  paymentMethod?: string | null;
  walletNumber?: string | null;
  status: paymentStatusTypes;
  rawResponse?: Record<string, any> | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICreatePayment {
  studentId: number;
  courseId: number;
  amount: number;
  provider?: string;
  providerOrderId?: string;
  providerTransactionId?: string;
  currency?: string;
  paymentMethod?: string;
  walletNumber?: string;
  status?: string;
  rawResponse?: Record<string, any>;
}

export interface IUpdatePaymentStatus {
  status: paymentStatusTypes;
  providerTransactionId?: string;
  rawResponse?: Record<string, any>;
  paymentMethod?: string;
}


// ---------------- Enrollments ---------------

export interface IEnrollment {
  studentId: number;
  courseId: number;
  paymentId: number;
  status: enrollmentStatusTypes;
  enrolledAt: Date | string;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export interface ICreateEnrollment {
  studentId: number;
  courseId: number;
  paymentId: number;
  status?: enrollmentStatusTypes;
}

export interface IUpdateEnrollment {
  status: enrollmentStatusTypes;
}

export interface ICourseStudent {
  id: number;
  username: string;
  email: string;
  phone?: string;
  enrolledAt: Date | string;
  enrollmentStatus: string;
}


// ---------------- Video ---------------


export interface IVideo {
  _id: string;
  courseId: string;
  order: number;
  title: string;
  url: string;
  duration: number;
  resolution: string;
  size?: number;
  createdAt: Date;
  updatedAt: Date;
}



// ---------------- Video ---------------