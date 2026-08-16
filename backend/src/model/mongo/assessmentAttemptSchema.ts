import mongoose, { Model } from "mongoose";
import answerSchema from "./answerSchema.js";
import type { IAssessmentAttempt } from "../../interfaces/index.js";

const assessmentAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      index: true
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    assessmentType: {
      type: String,
      enum: ['quiz', 'exam'],
      required: true
    },
    answers: {
      type: [answerSchema],
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['fully_graded', 'pending_review'],
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

assessmentAttemptSchema.index({ studentId: 1, quizId: 1 });

const AssessmentAttempt: Model<IAssessmentAttempt> = mongoose.model<IAssessmentAttempt>('ExamAttempt', assessmentAttemptSchema);