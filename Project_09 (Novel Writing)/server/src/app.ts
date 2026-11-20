import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import novelRoute from './routes/novel.route';
import chapterRoute from './routes/chapter.route';
import { connectDB } from './config/db';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/novels', novelRoute);
app.use('/api/v1/chapters', chapterRoute);

const PORT = process.env.PORT || 8888;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
  });
}

startServer();
