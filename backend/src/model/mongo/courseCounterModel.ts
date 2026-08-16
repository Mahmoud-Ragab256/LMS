import mongoose, { Model } from "mongoose";
import type { ICourseCounter } from "../../interfaces/index.js";

const courseCounterSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  lastOrder: {
    type: Number,
    required: true,
    default: 0
  }
});

const CourseCounter: Model<ICourseCounter> = mongoose.model<ICourseCounter>('CourseCounter', courseCounterSchema)

export default CourseCounter;