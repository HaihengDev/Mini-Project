import express from 'express';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import studentRouter from './routes/studentRoute.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/students', studentRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const server = createServer(app);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error('Failed to start server: ', err);
    process.exit(1);
  }
};

startServer();
