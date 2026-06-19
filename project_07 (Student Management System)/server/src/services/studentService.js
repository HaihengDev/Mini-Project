import studentRepository from '../repos/studentRepository.js';

class StudentService {
  async getStudents() {
    return await studentRepository.findAll();
  }

  async getStudentById(id) {
    const student = await studentRepository.findById(id);

    if (!student) {
      throw new Error('Student not found!');
    }

    return student;
  }

  async createStudent(data) {
    return await studentRepository.create(data);
  }

  async updateStudent(id, data) {
    return await studentRepository.update(id, data);
  }

  async deleteStudent(id) {
    return await studentRepository.delete(id);
  }
}

export default new StudentService();
