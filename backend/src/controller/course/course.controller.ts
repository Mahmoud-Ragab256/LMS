import type { Request, Response } from "express"
import type { ApiResponse } from "../../types/index.js"
import type { ICourse, ICourseFilter, ICourseRes, ICreateCourse, IUpdateCourse } from "../../interfaces/index.js"
import { createCourse, deleteCourse, getAllCourses, getCourseById, getTeacherCourses, updateCourse } from "../../model/pg/courseModel.js"
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

export const addCourse = async (
  req: Request<{}, ApiResponse<ICourse>, ICreateCourse>,
  res: Response<ApiResponse<ICourse>>,
): Promise<Response<ApiResponse<ICourse>>> => {

  try {

    const { title, price, description, imgUrl } = req.body;

    if (!title || !price || !description || !imgUrl) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request'
      });
    }

    const course = await createCourse(res.locals.user.id, { title, price, description, imgUrl });

    if (!course) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request'
      });
    }

    return res.json({
      status: 'success',
      data: course
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}

export const getAllTeacherCourses = async (
  req: Request<{ teacher_id: number }, ApiResponse<ICourse[]>, {}>,
  res: Response<ApiResponse<ICourse[]>>
): Promise<Response<ApiResponse<ICourse[]>>> => {

  try {

    const { teacher_id } = req.params;

    const courses = await getTeacherCourses(teacher_id);

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No Courses Found'
      });
    }

    return res.json({
      status: 'success',
      data: courses
    });
  } catch (error) {

    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}

export const getCourse = async (
  req: Request<{ id: number }, ApiResponse<ICourse>, {}>,
  res: Response<ApiResponse<ICourse>>
): Promise<Response<ApiResponse<ICourse>>> => {

  try {

    const { id } = req.params;

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({
        status: 'fail',
        message: 'Course Not Found'
      });
    }

    return res.json({
      status: 'success',
      data: course
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}

export const updateCourseData = async (
  req: Request<{ id: number }, ApiResponse<ICourse>, IUpdateCourse>,
  res: Response<ApiResponse<ICourse>>
): Promise<Response<ApiResponse<ICourse>>> => {

  try {

    const { id } = req.params;
    const { price, title, description, imgUrl } = req.body;

    if (!title || !price || !description || !imgUrl) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request'
      });
    }

    const updatedCourse = await updateCourse(id, res.locals.user.id, { title, price, description, imgUrl });

    if (!updatedCourse) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request'
      });
    }

    return res.json({
      status: 'success',
      data: updatedCourse
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}


export const deleteACourse = async (
  req: Request<{ id: number }, ApiResponse<ICourse>, {}>,
  res: Response<ApiResponse<ICourse>>
): Promise<Response<ApiResponse<ICourse>>> => {
  try {

    const { id } = req.params;

    const deletedCourse = await deleteCourse(id, res.locals.user.id);

    if (!deletedCourse) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request'
      });
    }

    return res.json({
      status: 'success',
      data: deletedCourse
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}