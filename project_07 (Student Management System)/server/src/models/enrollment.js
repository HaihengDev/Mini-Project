import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

enrollmentSchema.index(
  {
    student: 1,
    course: 1,
  },
  { unique: true },
);

export default mongoose.model('Enrollment', enrollmentSchema);
