import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization || req.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({
      status: 'failed',
      message: 'Not authorized!',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = (await User.findById(decoded.id).select('-password')) as IUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: 'Token invalid!',
    });
  }
};
