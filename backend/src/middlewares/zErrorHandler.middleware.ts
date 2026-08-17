import type { Request, Response, NextFunction } from "express";
import type AppError from "../utils/appError.js";
import type ZodError from "../utils/zodError.js";


const zodErrorHandler = (
  error: ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;


  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    errors: error.issues,
    stack: (process.env.NODE_ENV === 'development') ? error.stack : null
  })
}

export default zodErrorHandler;