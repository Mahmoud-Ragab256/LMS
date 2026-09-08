import type { ApiErrorResponse, ApiSuccessResponse } from "../interfaces/index.js";

export type QuestionType = 'mcq' | 'true_false' | 'essay' | 'matching';

export type CourseLevelType = 'primary' | 'preparatory' | 'secondary';

export type CourseCategoryType = 'physics' | 'chemistry' | 'math' | 'arabic' | 'english' | 'second_language' | 'science' | 'biology' | 'geology' | 'applied_math' | 'pure_math' | 'history' | 'geography' | 'philosophy' | 'psychology' | 'other';

export type CourseFilterOrderType = 'asc' | 'desc';

export type PaymentStatusType = 'pending' | 'success' | 'failed' | 'refunded';

export type EnrollmentStatusType = 'pending' | 'active' | 'canceled' | 'blocked';

export type AssessmentType = 'exam' | 'quiz';

export type AssessmentAttemptStatus = 'fully_graded' | 'pending_review';

export type ApiResponseStatus = 'fail' | 'error' | 'success';

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;