import bcrypt from 'bcrypt';
import userRepos from '../repositories/userRepos.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
  async login(email, password) {
    const user = await userRepos.findByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password!');
    }

    const token = generateToken(user);

    return {
      token,
      user: {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }
}

export default new AuthService();
