import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import roomRoute from './routes/roomRoute.js';
import studentRoute from './routes/studentRoute.js';
import teacherRoute from './routes/teacherRoute.js';
import courseRoute from './routes/courseRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/rooms', roomRoute);
app.use('/api/students', studentRoute);
app.use('/api/teachers', teacherRoute);
app.use('/api/courses', courseRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

const startServer = () => {
  try {
    const server = createServer(app);

    const PORT = process.env.PORT || 8888;

    server.listen(PORT, () => {
      console.log('Server is running on port 8888...');
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
