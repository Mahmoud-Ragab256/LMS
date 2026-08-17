import type { Request, Response } from "express";
import type { ICreateStudent, ICreateTeacher, IStudent, ITeacher } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { hashingPassword } from "../../utils/passwordsBcrypt.js";
import { createTeacher } from "../../model/pg/teacherModel.js";
import AppError from "../../utils/appError.js";
import { createTeacherSchema } from "../../validation/teacherValidationSchema.js";
import z from "zod";
import ZodError from "../../utils/zodError.js";
import jwt from 'jsonwebtoken'
import { createStudentSchema } from "../../validation/studentValidationSchema.js";
import { createStudent } from "../../model/pg/studentModel.js";



export const registerTeacher = async (
  req: Request<{}, ApiResponse<ITeacher>, ICreateTeacher>,
  res: Response<ApiResponse<ITeacher>>
): Promise<Response<ApiResponse<ITeacher>>> => {
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
    const { id, active } = teacher;

    const token = jwt.sign({ id, active }, process.env.SECRET as string, {
      expiresIn: "30d"
    });

    return res.status(201).json({
      status: 'success',
      jwt: token,
      data: teacher
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new ZodError(400, error.issues)

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);
  }
}


const registerStudent = async (
  req: Request<{}, ApiResponse<IStudent>, ICreateStudent>,
  res: Response<ApiResponse<IStudent>>
): Promise<Response<ApiResponse<IStudent>> | void> => {
  try {
    const { username, email, password, phone, nid } = req.body;

    createStudentSchema.parse({ username, email, password, phone, nid })

    const hashedPassword = await hashingPassword(password);
    const student = await createStudent({ username, email, password: hashedPassword, phone, nid });


    if (!student) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
    const { id, active } = student;

    const token = jwt.sign({ id, active }, process.env.SECRET as string, {
      expiresIn: "30d"
    });

    return res.status(201).json({
      status: 'success',
      jwt: token,
      data: student
    });
  } catch (error) {
    if (error instanceof z.ZodError) throw new ZodError(400, error.issues)

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    throw new AppError(statusCode, message);

  }
}