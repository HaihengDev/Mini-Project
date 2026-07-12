import enrollmentRepos from '../repositories/enrollmentRepos.js';

class EnrollmentService {
  async getAll() {
    return await enrollmentRepos.findAll();
  }

  async getById(id) {
    return await enrollmentRepos.findById(id);
  }
}

export default new EnrollmentService();
