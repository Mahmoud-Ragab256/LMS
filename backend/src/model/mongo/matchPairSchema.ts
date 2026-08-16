import mongoose from 'mongoose'
import type { IMatchPair } from '../../interfaces/index.js'

const matchPairSchema = new mongoose.Schema(
  {
    left: {
      type: String,
      required: true
    },
    right: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

export default matchPairSchema;