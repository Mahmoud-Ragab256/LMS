import mongoose, { Model } from 'mongoose'
import questionSchema from './questionSchema.js';
import type { IAssessment } from '../../interfaces/index.js';

const assessmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      index: true
    },
    assessmentType: {
      type: String,
      enum: ['quiz', 'exam'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    questions: {
      type: [questionSchema],
      default: undefined
    },
    timeLimit: {
      type: Number,
      default: 600
    },
    passingScore: {
      type: Number,
      default: 5
    }
  },
  { timestamps: true }
);

assessmentSchema.index({ courseId: 1, order: 1 });
assessmentSchema.index({ courseId: 1, assessmentType: 1 });

const Assessment: Model<IAssessment> = mongoose.model<IAssessment>('Assessment', assessmentSchema);

export default Assessment;