import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoute from './routes/authRoute';
import messageRoute from './routes/messagesRoute';
import { initSocket } from './socket';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

initSocket(io);

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...`),
);
