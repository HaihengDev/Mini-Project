import enrollments from '../models/enrollment.js';

class EnrollmentRepository {
  async findAll() {
    return await enrollments
      .find()
      .populate('student')
      .populate({
        path: 'course',
        populate: {
          path: 'teacher',
        },
      });
  }

  async findById(id) {
    return await enrollments
      .findById(id)
      .populate('student')
      .populate({
        path: 'course',
        populate: {
          path: 'teacher',
        },
      });
  }

  async create(enrollment) {
    return await enrollments.create(enrollment);
  }

  async update(id, updateData) {
    return await enrollments.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await enrollments.findByIdAndDelete(id);
  }
}

export default new EnrollmentRepository();
