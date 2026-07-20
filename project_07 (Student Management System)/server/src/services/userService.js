import bcrypt from 'bcrypt';
import userRepos from '../repositories/userRepos.js';

class UserService {
  async register(user) {
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

  async login(email, password) {
    const user = await userRepos.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new Error('Invalid email or password.');
    }

    await userRepos.updateLastLogin(user.user_id);

    return user;
  }
}

export default new UserService();
