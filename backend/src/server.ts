import express, { type Request, type Response } from 'express'
import { pool } from './model/pg/connection.js'
import Query from './model/pg/connection.js';


const app = express();

app.get('/api/pg/health', async (req: Request, res: Response) => {
  try {
    const result = await Query('SELECT * FROM students');
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});