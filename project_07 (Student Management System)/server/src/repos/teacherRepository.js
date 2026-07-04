import Teacher from '../models/teacher.js';

class TeacherRepository {
  async findAll() {
    return await Teacher.find().populate('course');
  }

  async findById(id) {
    return await Teacher.findById(id).populate('course');
  }

  async create(teacher) {
    return await Teacher.create(teacher);
  }

  async update(id, updatedData) {
    return await Teacher.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).populate('course');
  }

  async delete(id) {
    return await Teacher.findByIdAndDelete(id);
  }
}

export default new TeacherRepository();
