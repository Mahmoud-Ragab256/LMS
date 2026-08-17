import type { Request, Response } from "express";
import type { ICreateTeacher, ITeacher } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { hashingPassword } from "../../utils/passwordsBcrypt.js";
import { createTeacher } from "../../model/pg/teacherModel.js";
import { AppError } from "../../utils/appError.js";



const registerTeacher = async (
  req: Request<{}, ApiResponse<ICreateTeacher>, ICreateTeacher>,
  res: Response<ApiResponse<ICreateTeacher>>
): Promise<Response<ApiResponse<ICreateTeacher>>> => {
  try {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }
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
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new AppError(500, message)
  }
}