import userService from './userService.js';
import studentRepository from '../repositories/studentRepos.js';
import {generatePassword} from "../utils/generatePassword.js";

class StudentService {
  async getAll() {
    return await studentRepository.findAll();
  }

  async getById(id) {
    return await studentRepository.findById(id);
  }

  async create(student) {
    const {
      student_id,
      first_name,
      last_name,
      dob,
      gender,
      class_id
    } = student;

    if(
      !student_id ||
      !first_name ||
      !last_name ||
      !dob ||
      !gender ||
      !class_id
    ) {
      throw new Error('All student information is required!');
    }

    const username = `${first_name.toLowerCase()}-${last_name.toLowerCase()}`;
    const email = `${first_name.toLowerCase()}${last_name.toLowerCase()}@gmail.com`;
    const password = generatePassword();

    const userId = await userService.createUser({
      username,
      email,
      password,
      role: 'student',
    });

    const studentId = await studentRepository({
      student_id,
      user_id: userId,
      first_name,
      last_name,
      dob,
      gender,
      class_id,
    });

    return {
      userId,
      studentId
    }
  }
}

export default new StudentService();
