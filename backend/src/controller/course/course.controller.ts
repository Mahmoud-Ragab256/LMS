import type { Request, Response } from "express"
import type { ApiResponse } from "../../types/index.js"
import type { ICourseFilter, ICourseRes } from "../../interfaces/index.js"
import { getAllCourses } from "../../model/pg/courseModel.js"
import AppError from "../../utils/appError.js"

export const getCourses = async (
  req: Request<{}, ApiResponse<ICourseRes[]>, {}, ICourseFilter>,
  res: Response<ApiResponse<ICourseRes[]>>
): Promise<Response<ApiResponse<ICourseRes[]>>> => {
  try {
    const courses = await getAllCourses(req.query as ICourseFilter);

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No Courses Found'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: courses,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}