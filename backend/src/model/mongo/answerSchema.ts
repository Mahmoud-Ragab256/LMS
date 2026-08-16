import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['mcq', 'true_false', 'essay', 'matching'],
      required: true
    },
    selectedAnswer: {
      type: String
    },
    textAnswer: {
      type: String
    },
    selectedPairs: {
      type: [
        {
          left: Number,
          right: Number,
          _id: false
        }
      ],
      default: undefined
    },
    isCorrect: {
      type: Boolean,
      default: null
    },
    score: {
      type: Number,
      default: null
    },
    graded: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
);

export default answerSchema;