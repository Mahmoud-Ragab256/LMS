import type { Request, Response } from "express";
import type { ICreateTeacher, ITeacher } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { hashingPassword } from "../../utils/passwordsBcrypt.js";
import { createTeacher } from "../../model/pg/teacherModel.js";
import AppError from "../../utils/appError.js";
import { createTeacherSchema } from "../../validation/teacherValidationSchema.js";
import z from "zod";
import ZodError from "../../utils/zodError.js";



export const registerTeacher = async (
  req: Request<{}, ApiResponse<ICreateTeacher>, ICreateTeacher>,
  res: Response<ApiResponse<ICreateTeacher>>
): Promise<Response<ApiResponse<ICreateTeacher>>> => {
  try {
    const { username, email, password, phone } = req.body;

    createTeacherSchema.parse({ username, email, password, phone })

    const hashedPassword = await hashingPassword(password);
    const teacher = await createTeacher({ username, email, password: hashedPassword, phone });

    if (!teacher) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
    return res.status(201).json({
      status: 'success',
      data: teacher
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new ZodError(400, error.issues)

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new AppError(500, message);
  }
}