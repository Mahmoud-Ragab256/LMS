import type { Request, Response } from "express";
import type { ITeacherRes } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { deleteTeacher, getAllTeachers, getTeacherById } from "../../model/pg/teacherModel.js";
import AppError from "../../utils/appError.js";






export const getTeachers = async (
  req: Request<{}, ApiResponse<ITeacherRes[]>, {}>,
  res: Response<ApiResponse<ITeacherRes[]>>,
): Promise<Response<ApiResponse<ITeacherRes[]>>> => {

  try {

    const teachers = await getAllTeachers();

    if (!teachers || teachers.length === 0) {
      return res.json({
        status: "fail",
        message: "No Teachers Found!"
      })
    }


    return res.json({
      status: "success",
      data: teachers
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }

}


export const getTeacher = async (
  req: Request<{ id: number }, ApiResponse<ITeacherRes>, {}>,
  res: Response<ApiResponse<ITeacherRes>>
): Promise<Response<ApiResponse<ITeacherRes>>> => {

  try {

    const { id } = req.params;

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid id'
      });
    }

    const teacher = await getTeacherById(id);

    if (!teacher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Teacher Not Found'
      });
    }

    return res.json({
      status: 'success',
      data: teacher
    });


  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }

}







export const removeTeacher = async (
  req: Request<{ id: number }, ApiResponse<ITeacherRes>, {}>,
  res: Response<ApiResponse<ITeacherRes>>
): Promise<Response<ApiResponse<ITeacherRes>>> => {

  try {

    const { id } = req.params;

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid id'
      });
    }

    const deletedTeacher = await deleteTeacher(id);

    if (!deletedTeacher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Teacher Not Found'
      });
    }

    return res.json({
      status: 'success',
      data: deletedTeacher
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}