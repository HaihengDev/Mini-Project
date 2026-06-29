import Course from '../models/course.js';

class CourseRepository {
  async findAll() {
    return await Course.find();
  }

  async findById() {
    return await Course.findById(id);
  }

  async create(course) {
    return await Course.create(course);
  }

  async update(id, updateData) {
    return await Course.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Course.findByIdAndDelete(id);
  }
}

export default new CourseRepository();
