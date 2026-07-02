import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: Number,
      unique: true,
    },
    student: {
      type: [String],
      required: true,
    },
    teacher: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Room', roomSchema);
