import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    lecturer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Course', courseSchema);
