import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRoute from './routes/product.route.js';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/products', productRoute);

const server = createServer(app);
const PORT = process.env.PORT || 8888;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
};

startServer();
