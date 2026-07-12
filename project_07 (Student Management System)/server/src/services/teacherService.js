import teacherRepository from '../repositories/teacherRepos.js';

class TeacherService {
  async getAll() {
    return await teacherRepository.findAll();
  }

  async getById(id) {
    return await teacherRepository.findById(id);
  }
}

export default new TeacherService();
