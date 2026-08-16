import mongoose from 'mongoose'

const mongoConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}




export default mongoConnection;