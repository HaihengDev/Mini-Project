import { Response } from 'express';
import Message from '../models/Message';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const myId = req.user?._id;
    const userId = Array.isArray(req.params.userId)
      ? req.params.userId[0]
      : req.params.userId;
    const otherId = new mongoose.Types.ObjectId(userId);

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: otherId },
        { sender: otherId, receiver: myId },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(100)
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar');

    await Message.updateMany(
      { sender: otherId, receiver: myId, isRead: false },
      { isRead: true },
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'Server error!',
    });
  }
};

export { getUserById };
