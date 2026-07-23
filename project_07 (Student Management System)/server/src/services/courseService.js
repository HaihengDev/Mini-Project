import courseRepos from '../repositories/courseRepos.js';

class CourseService {
  async getAll() {
    return await courseRepos.findAll();
  }

  async getById(id) {
    return await courseRepos.findById(id);
  }

  async create(course) {
    const { course_name, course_code, class_id } = course;

    if (!course_name || !course_code || !class_id) {
      throw new Error('Course information is required!');
    }

    return await courseRepos.create({
      course_name,
      course_code,
      class_id,
    });
  }
}

export default new CourseService();
