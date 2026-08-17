import type { EnrollmentStatusType, AssessmentType, PaymentStatusType, QuestionType, AssessmentAttemptStatus, ApiResponseStatus } from "../types/index.js";

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
  status: PaymentStatusType;
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
  status: PaymentStatusType;
  providerTransactionId?: string;
  rawResponse?: Record<string, any>;
  paymentMethod?: string;
}


// ---------------- Enrollments ---------------

export interface IEnrollment {
  studentId: number;
  courseId: number;
  paymentId: number;
  status: EnrollmentStatusType;
  enrolledAt: Date | string;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export interface ICreateEnrollment {
  studentId: number;
  courseId: number;
  paymentId: number;
  status?: EnrollmentStatusType;
}

export interface IUpdateEnrollment {
  status: EnrollmentStatusType;
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
  createdAt: Date | string;
  updatedAt: Date | string;
}



// ---------------- Questions ---------------

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


// ---------------- Quizzes and Exams ---------------

export interface IAssessment {
  _id: string;
  courseId: string;
  order: number;
  assessmentType: AssessmentType;
  title: string;
  questions: IQuestion[];
  timeLimit: number;
  passingScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISelectedPair {
  left: number;
  right: number;
}

export interface IAnswer {
  questionIndex: number;
  type: QuestionType;
  selectedAnswer?: string;
  textAnswer?: string;
  selectedPairs?: ISelectedPair[];
  isCorrect: boolean | null;
  score: number | null;
  graded: boolean;
}

export interface IAssessmentAttempt {
  _id: string;
  studentId: string;
  quizId: string;
  assessmentType: AssessmentType;
  answers: IAnswer[];
  totalScore: number;
  maxScore: number;
  status: AssessmentAttemptStatus;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}


// ---------------- Counter ---------------

export interface ICourseCounter {
  _id: string;
  courseId: string;
  lastOrder: number;
}


// ---------------- API ---------------

export interface ApiSuccessResponse<T = any> {
  status: ApiResponseStatus;
  data?: T;
  jwt?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export type ApiErrorResponse = {
  status: ApiResponseStatus;
  message: string;
  errors?: any;
};