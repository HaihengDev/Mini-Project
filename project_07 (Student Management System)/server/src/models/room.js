import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Room', roomSchema);
