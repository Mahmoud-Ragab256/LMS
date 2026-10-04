import mongoose from 'mongoose';

async function mongoConnection(): Promise<void> {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error('MONGO_URL is not defined in .env');
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
    console.log('Connected database name:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default mongoConnection;