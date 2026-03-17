import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      res.status(400).json({
        status: 'failed',
        message: 'User already exists!',
      });
      return;
    }
    const user = await User.create({ username, email, password });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(String(user._id)),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(String(user._id)),
    });
  } catch (err) {}
};

const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find({ _id: { $ne: req.user?._id } }).select(
    '-password',
  );
  res.json(users);
};

export { register, login, getUsers };
