import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  score: {
    type: Map,
    of: Number,
    required: true,
  },
  course: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Student', studentSchema);
