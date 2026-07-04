import Course from '../models/course.js';

class CourseRepository {
  async findAll() {
    return await Course.find().populate('teacher');
  }

  async findById() {
    return await Course.findById(id).populate('teacher');
  }

  async create(course) {
    return await Course.create(course);
  }

  async update(id, updateData) {
    return await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate('teacher');
  }

  async delete(id) {
    return await Course.findByIdAndDelete(id);
  }
}

export default new CourseRepository();
