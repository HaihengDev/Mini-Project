import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Message from '../models/Message';

const onlineUsers = new Map<string, string>();

export const initSocket = (io: Server): void => {
  io.use(async (socket: Socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error('Authentication error'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      (socket as any).userId = decoded.id;
      next();
    } catch {
      next(new Error('Authenticatino error'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const userId = (socket as any).userId as string;
    onlineUsers.set(userId, socket.id);

    //make user online
    await User.findByIdAndUpdate(userId, { isOnline: true });

    // broadcast online users list
    io.emit('online_users', Array.from(onlineUsers.keys()));

    console.log(`User ${userId} connected`);

    // handle sending message
    socket.on(
      'send_message',
      async (data: { receiverId: string; content: string }) => {
        try {
          const message = await Message.create({
            sender: userId,
            receiver: data.receiverId,
            content: data.content.trim(),
          });

          const populated = await message.populate([
            { path: 'sender', select: 'username avatar' },
            { path: 'receiver', select: 'username avatar' },
          ]);

          const receiverSocketId = onlineUsers.get(data.receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiver_message', populated);
          }

          socket.emit('message_sent', populated);
        } catch (err) {
          socket.emit('error', { message: 'Failed to send message!' });
        }
      },
    );

    socket.on('typing', ({ receiverId }: { receiverId: string }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('user_typing', { senderId: userId });
      }
    });

    socket.on('stop_typing', ({ receiverId }: { receiverId: string }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('user_stop_typing', { sender: userId });
      }
    });

    // Disconnect
    socket.on('disconnect', async () => {
      onlineUsers.delete(userId);
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });
      io.emit('online_users', Array.from(onlineUsers.keys()));
      console.log(`User ${userId} disconnected`);
    });
  });
};
