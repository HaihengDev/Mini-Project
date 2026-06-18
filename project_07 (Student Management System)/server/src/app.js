import express from 'express';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
};

startServer();
