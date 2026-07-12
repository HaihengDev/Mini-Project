import CourseRepos from '../repositories/courseRepos.js';

class CourseService {
  async getAll() {
    return await CourseRepos.findAll();
  }

  async getById(id) {
    return await CourseRepos.findById(id);
  }
}

export default new CourseService();
