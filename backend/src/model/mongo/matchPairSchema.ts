import mongoose from 'mongoose'

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