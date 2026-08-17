import express, { type NextFunction, type Request, type Response } from 'express'
import Query from './model/pg/connection.js';
import mongoose from 'mongoose';
import { registerTeacher } from './controller/auth/auth.controller.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import AppError from './utils/appError.js';
import zodErrorHandler from './middlewares/zErrorHandler.middleware.js';
import app from './server.js';



app.use(express.json());


app.get('/api/v1/pg/health', async (req: Request, res: Response) => {
  try {
    const result = await Query('SELECT * FROM teachers;');
    res.status(200).json({
      status: 'success',
      message: 'Database connection is healthy!',
      time: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : null
    });
  }
});

app.post('/api/v1/home', registerTeacher)

app.get('/api/v1/mongo/health', async (req: Request, res: Response) => {
  try {
    const dbState = mongoose.connection.readyState;
    res.status(200).json({
      status: 'success',
      message: 'Database connection is healthy!',
      readyState: dbState
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : null
    });
  }
});

app.all('{*path}', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(404, 'Route not found');
  next(error);
});

app.use(zodErrorHandler);
app.use(errorHandler);
