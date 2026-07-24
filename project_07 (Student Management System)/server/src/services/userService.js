import bcrypt from 'bcrypt';
import userRepos from '../repositories/userRepos.js';

class UserService {
  async createUser(user) {
    const exist = await userRepos.findByEmail(user.email);

    if (exist) {
      throw new Error('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const id = await userRepos.create({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      role: user.role || 'student',
    });

    return id;
  }
}

export default new UserService();
