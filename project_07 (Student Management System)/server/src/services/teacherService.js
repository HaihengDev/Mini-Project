import teacherRepository from '../repositories/teacherRepos.js';

class TeacherService {
  async getAll() {
    return await teacherRepository.findAll();
  }

  async getById(id) {
    return await teacherRepository.findById(id);
  }

  async create(teacher) {
    const {
      user_id,
      employee_no,
      first_name,
      last_name,
      gender,
      phone,
      joining_date,
    } = teacher;

    if (
      !user_id ||
      !employee_no ||
      !first_name ||
      !last_name ||
      !gender ||
      !phone ||
      !joining_date
    ) {
      throw new Error('All teacher informatioin is required');
    }

    return await teacherRepository.create({
      user_id,
      employee_no,
      first_name,
      last_name,
      phone,
      joining_date,
    });
  }
}

export default new TeacherService();
