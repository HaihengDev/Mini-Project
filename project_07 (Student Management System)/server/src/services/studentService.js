import studentRepository from '../repositories/studentRepos.js';

class StudentService {
  async getAll() {
    return await studentRepository.findAll();
  }

  async getById(id) {
    return await studentRepository.findById(id);
  }

  async create(student) {
    return await studentRepository.create(student);
  }
}

export default new StudentService();
