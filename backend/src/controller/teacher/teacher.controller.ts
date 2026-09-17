import type { Request, Response } from "express";
import type { ITeacherRes } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { getAllTeachers } from "../../model/pg/teacherModel.js";
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