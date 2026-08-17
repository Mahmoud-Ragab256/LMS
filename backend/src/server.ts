import express, { type Request, type Response } from 'express'
import Query from './model/pg/connection.js';
import mongoose from 'mongoose';
import mongoConnection from './model/mongo/connection/connection.js';

const PORT = parseInt(process.env.PORT as string) | 3000
const app = express();

app.get('/api/pg/health', async (req: Request, res: Response) => {
  try {
    const result = await Query('SELECT NOW()');
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

app.get('/api/mongo/health', async (req: Request, res: Response) => {
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


const startServer = async (): Promise<void> => {
  try {
    await mongoConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();