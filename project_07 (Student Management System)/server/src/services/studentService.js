import studentRepository from '../repositories/studentRepos.js';

class StudentService {
  async getAll() {
    return await studentRepository.findAll();
  }

  async getById(id) {
    return await studentRepository.findById(id);
  }
}

export default new StudentService();
