import crypto from 'crypto';
import userService from './userService.js';
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
      employee_no,
      first_name,
      last_name,
      gender,
      phone,
      joining_date,
    } = teacher;

    if (
      !employee_no ||
      !first_name ||
      !last_name ||
      !gender ||
      !phone ||
      !joining_date
    ) {
      throw new Error('All teacher information is required');
    }

    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    const username = `${first_name} ${last_name}`;
    const email = `${first_name.toLowerCase()}${last_name.toLowerCase()}${randomNumber}@email.com`;
    const password = crypto.randomBytes(8).toString('hex');

    const userId = await userService.createUser({
      username,
      email,
      password,
      role: 'teacher',
    });

    const teacherId = await teacherRepository.create({
      user_id: userId,
      employee_no,
      first_name,
      last_name,
      gender,
      phone,
      joining_date,
    });

    return {
      userId,
      teacherId
    }
  }
}

export default new TeacherService();
