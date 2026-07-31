import bcrypt from 'bcrypt';
import userRepos from '../repositories/userRepos.js';
import { generateToken } from '../utils/jwt.js';
import {generateOtp} from "../utils/generateOtp.js";

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

  async forgotPassword(email) {
    const user = await userRepos.findByEmail(email);

    if(!user) {
      throw new Error('User not found.');
    }

    const otp = generateOtp();

    const expires = new Date(Date.now() + 5 * 60 * 100);

    await userRepos.saveResetOtp(
      user.user_id,
      otp,
      expires
    );

    console.log('================================');
    console.log(`Password Reset OTP: ${otp}`);
    console.log(`Email: ${email}`);
    console.log(`Expires: ${expires}`);
    console.log('================================');

    return {
      success: true,
      message: 'OTP Generated successfully.'
    }
  }

  async verifyOtp(email, otp) {
    const user = await userRepos.verifyResetOtp(
      email,
      otp
    );

    if(!user) {
      throw new Error('Invalid or expired OTP.')
    }

    return {
      success: true,
      message: 'OTP verified successfully.'
    }
  }

  async resetPassword(email, otp, newPassword) {
    const user = await userRepos.verifyResetOtp(email, otp);

    if(!user) {
      throw new Error('Invalid or expire OTP.')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepos.updatePassword(
      user.user_id,
      hashedPassword
    );

    return {
      success: true,
      message: 'Password reset successfully.'
    }
  }
}

export default new AuthService();
