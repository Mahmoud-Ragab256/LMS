import mongoose from 'mongoose'
import matchPairSchema from './matchPairSchema.js'

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['mcq', 'true_false', 'essay', 'matching'],
      required: true,
    },
    text: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      default: undefined
    },
    correctAnswer: {
      type: String
    },
    modelAnswer: {
      type: String,
      required: true
    },
    pairs: {
      type: [matchPairSchema],
      default: undefined
    },
    points: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { _id: false }
);

export default questionSchema;