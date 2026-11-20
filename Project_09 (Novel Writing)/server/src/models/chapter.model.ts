import mongoose from 'mongoose';
import { IChapter } from '../types/types';

const chapterSchema = new mongoose.Schema<IChapter>(
  {
    chapter_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    novel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'chapters' },
);

export default mongoose.model<IChapter>('Chapter', chapterSchema);
