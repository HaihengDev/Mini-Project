import Teacher from '../models/teacher.js';

class TeacherRepository {
  async findAll() {
    return await Teacher.find();
  }

  async findById(id) {
    return await Teacher.findById(id);
  }

  async create(teacher) {
    return await Teacher.create(teacher);
  }

  async update(id, updatedData) {
    return await Teacher.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async delete(id) {
    return await Teacher.findByIdAndDelete(id);
  }
}

export default new TeacherRepository();
