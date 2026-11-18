import express from 'express';
import dotenv from 'dotenv';
import NovelRoute from './routes/novel.route';
import { connectDB } from './config/db';
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/novels', NovelRoute);

const PORT = process.env.PORT || 8888;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
  });
}

startServer();
