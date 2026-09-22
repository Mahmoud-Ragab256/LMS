import type { Request, Response } from "express";
import type { ITeacher, ITeacherRes, IUpdateTeacher } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { deleteTeacher, getAllTeachers, getTeacherById, getTeacherPassword, updateTeacher, updateTeacherPassword } from "../../model/pg/teacherModel.js";
import AppError from "../../utils/appError.js";
import { updateTeacherSchema } from "../../validation/teacherValidationSchema.js";
import { comparingPassword, hashingPassword } from "../../utils/passwordsBcrypt.js";






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


export const updateTeacherData = async (
  req: Request<{}, ApiResponse<ITeacher>, IUpdateTeacher>,
  res: Response<ApiResponse<ITeacher>>
): Promise<Response<ApiResponse<ITeacher>>> => {
  try {

    const { username, phone } = req.body;

    updateTeacherSchema.safeParse({ username, phone });

    const updatedTeacher = await updateTeacher(res.locals.user.id, { username, phone });

    if (!updatedTeacher) {
      return res.status(404).json({
        status: 'fail',
        message: 'Teacher Not Found'
      });
    }

    return res.json({
      status: 'success',
      data: updatedTeacher
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}

export const changeTeacherPassword = async (
  req: Request<{ id: number }, ApiResponse<string>, { oldPassword: string, newPassword: string, confirmPassword: string }>,
  res: Response<ApiResponse<string>>
): Promise<Response<ApiResponse<string>>> => {

  try {
    const { id } = req.params;

    if (!id || isNaN(+id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid id'
      });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const password = await getTeacherPassword(res.locals.user.id);

    const isMatch = await comparingPassword(oldPassword, password);

    if (!isMatch) {
      return res.status(400).json({
        status: 'fail',
        message: 'Wrong Password'
      });
    } else if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'New Password and Confirm Password does not match'
      });
    }

    const hashedPassword = await hashingPassword(newPassword);

    updateTeacherPassword(res.locals.user.id, hashedPassword);

    return res.json({
      status: 'success',
      data: 'Password changed successfully'
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