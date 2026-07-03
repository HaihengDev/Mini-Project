import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
  },
  teacherFirstName: {
    type: String,
    required: true,
  },
  teacherLastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Teacher', 'Director'],
    default: 'Teacher',
  },
  salary: {
    type: Number,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

export default mongoose.model('Teacher', teacherSchema);
