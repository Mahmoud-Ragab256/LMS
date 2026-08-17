import mongoConnection from './model/mongo/connection/connection.js';
import express from 'express';


const PORT = parseInt(process.env.PORT as string) | 3000

const app = express();



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

export default app;