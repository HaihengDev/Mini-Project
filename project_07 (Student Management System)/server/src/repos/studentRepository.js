import Student from '../models/student.js';

class StudentRepository {
  async findAll() {
    return await Student.find();
  }

  async findById() {
    return await Student.findById();
  }

  async create(studentData) {
    return await Student.create(studentData);
  }

  async update(id, updateData) {
    return await Student.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Student.findByIdAndDelete(id);
  }
}

export default new StudentRepository();
