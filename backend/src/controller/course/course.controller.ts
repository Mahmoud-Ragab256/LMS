import type { Request, Response } from "express"
import type { ApiResponse } from "../../types/index.js"
import type { ICourse, ICourseFilter, ICourseRes, ICreateCourse, IUpdateCourse } from "../../interfaces/index.js"
import { createCourse, deleteCourse, getAllCourses, getCourseById, getTeacherCourses, updateCourse } from "../../model/pg/courseModel.js"
import AppError from "../../utils/appError.js"
import { createCourseSchema, updateCourseSchema } from "../../validation/courseValidationSchema.js"

export const getCourses = async (
  req: Request<{}, ApiResponse<ICourseRes[]>, {}, ICourseFilter>,
  res: Response<ApiResponse<ICourseRes[]>>
): Promise<Response<ApiResponse<ICourseRes[]>>> => {
  try {

    const { category, level, search, minPrice, maxPrice, sortBy, order, page, limit } = req.query;


    const courses = await getAllCourses({ category, level, search, minPrice, maxPrice, sortBy, order, page, limit });

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

    createCourseSchema.safeParse({ title, price, description, imgUrl })

    const course = await createCourse(res.locals.user.id, { title, price, description, imgUrl });

    if (!course) {
      return res.status(400).json({
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

    if (!teacher_id || isNaN(+teacher_id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid URL Teacher_id'
      })
    }

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

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid URL id'
      })
    }

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

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid URL id'
      })
    }

    const { price, title, description, imgUrl } = req.body;

    updateCourseSchema.safeParse({ price, title, description, imgUrl });

    const updatedCourse = await updateCourse(id, res.locals.user.id, { title, price, description, imgUrl });

    if (!updatedCourse) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
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

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid URL id'
      })
    }

    const deletedCourse = await deleteCourse(id, res.locals.user.id);

    if (!deletedCourse) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
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