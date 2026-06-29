import TeacherRepository from '../repos/teacherRepository.js';

class TeacherService {
  async getAll() {
    return await TeacherRepository.findAll();
  }

  async getById(id) {
    return await TeacherRepository.findById(id);
  }

  async create(teacher) {
    return await TeacherRepository.create(teacher);
  }

  async update(id, updatedData) {
    return await TeacherRepository.update(id, updatedData);
  }

  async delete(id) {
    return await TeacherRepository.delete(id);
  }
}

export default new TeacherService();
