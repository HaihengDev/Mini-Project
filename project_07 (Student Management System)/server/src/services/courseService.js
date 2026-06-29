import courseRepository from '../repos/courseRepository.js';

class CourseService {
  async getAll() {
    return await courseRepository.findAll();
  }

  async getById(id) {
    return await courseRepository.findById(id);
  }

  async create(course) {
    return await courseRepository.create(course);
  }

  async update(id, updateData) {
    return await courseRepository.update(id, updateData);
  }

  async delete(id) {
    return await courseRepository.delete(id);
  }
}

export default new CourseService();
