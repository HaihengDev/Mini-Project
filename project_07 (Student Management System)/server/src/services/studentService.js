import userService from './userService.js';
import studentRepository from '../repositories/studentRepos.js';
import { generatePassword } from '../utils/generatePassword.js';

class StudentService {
  async getAll() {
    return await studentRepository.findAll();
  }

  async getById(id) {
    return await studentRepository.findById(id);
  }

  async create(student) {
    const { first_name, last_name, dob, gender, class_id, photo_url } = student;

    if (!first_name || !last_name || !dob || !gender || !class_id) {
      throw new Error('All student information is required!');
    }

    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    const username = `${first_name.toLowerCase()}-${last_name.toLowerCase()}`;
    const email = `${first_name.toLowerCase()}${last_name.toLowerCase()}${randomNumber}@gmail.com`;
    const password = await generatePassword();

    console.log(password);

    const userId = await userService.createUser({
      username,
      email,
      password,
      role: 'student',
    });

    const studentCreated = await studentRepository.create({
      user_id: userId,
      first_name,
      last_name,
      dob,
      gender,
      class_id,
      photo_url
    });

    return {
      userId,
      student: studentCreated,
    };
  }
}

export default new StudentService();
