import studentDetailRepos from '../repositories/studentDetailRepos.js';

class StudentDetailService {
  async getAll() {
    return await studentDetailRepos.findAll();
  }

  async getById(id) {
    return await studentDetailRepos.findById(id);
  }
}

export default new StudentDetailService();
