import enrollmentRepository from '../repos/enorllmentRepository.js';

class EnrollmentService {
  async getAll() {
    return await enrollmentRepository.getAll();
  }

  async getById(id) {
    return await enrollmentRepository.getById(id);
  }

  async create(enrollment) {
    return await enrollmentRepository.create(enrollment);
  }

  async update(id, updateData) {
    return await enrollmentRepository.update(id, updateData);
  }

  async delete(id) {
    return await enrollmentRepository.delete(id);
  }
}

export default new EnrollmentService();
