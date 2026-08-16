import mongoose, { Model } from 'mongoose'
import type { IVideo } from '../../interfaces/index.js';

const videoSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      index: true
    },
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    resolution: {
      type: String,
      default: '1080p'
    },
    size: {
      type: Number
    }
  },
  { timestamps: true }
);

videoSchema.index({ courseId: 1, order: 1 });

const Video: Model<IVideo> = mongoose.model<IVideo>('Video', videoSchema);
export default Video;