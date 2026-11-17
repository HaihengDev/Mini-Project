import mongoose from 'mongoose';
import { INovel } from '../types/types';

const novelSchema = new mongoose.Schema<INovel>(
  {
    novel_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'novels' },
);

export default mongoose.model<INovel>('Novel', novelSchema);
