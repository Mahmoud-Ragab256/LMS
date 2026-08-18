import type { Request, Response } from "express";
import type { ICreateStudent, ICreateTeacher, IStudent, ITeacher, LoginReqBody } from "../../interfaces/index.js";
import type { ApiResponse } from "../../types/index.js";
import { comparingPassword, hashingPassword } from "../../utils/passwordsBcrypt.js";
import { createTeacher, getTeacherByEmail } from "../../model/pg/teacherModel.js";
import AppError from "../../utils/appError.js";
import { loginTeacherSchema, registerTeacherSchema } from "../../validation/teacherValidationSchema.js";
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

    registerTeacherSchema.parse({ username, email, password, phone })

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


export const registerStudent = async (
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

export const loginTeacher = async (
  req: Request<{}, ApiResponse<ITeacher>, LoginReqBody>,
  res: Response<ApiResponse<ITeacher>>
): Promise<Response<ApiResponse<ITeacher>> | void> => {
  try {
    const { email, password } = req.body;
    loginTeacherSchema.parse({ email, password })

    const teacher = await getTeacherByEmail(email)

    if (!teacher) {
      return res.status(400).json({
        status: 'fail',
        message: 'email or password is incorrect'
      })
    }

    const passwordMatching = await comparingPassword(password, teacher.password)

    if (!passwordMatching) {
      return res.status(400).json({
        status: 'fail',
        message: 'email or password is incorrect'
      })
    }

    const { id, active } = teacher;
    const token = jwt.sign({ id, active }, process.env.SECRET as string, {
      expiresIn: '30d'
    })

    delete (teacher as any).password

    return res.status(200).json({
      status: 'success',
      jwt: token,
      data: teacher
    })

  } catch (error) {
    if (error instanceof z.ZodError) throw new ZodError(400, error.issues)

    const message = error instanceof Error ? error.message : "Internal Server Error"
    const statusCode = error instanceof AppError ? error.statusCode : 500
    throw new AppError(statusCode, message)
  }
}
