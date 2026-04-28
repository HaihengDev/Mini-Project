import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import morgan from 'morgan';
import productRoute from './routes/productRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/products', productRoute);

const server = createServer(app);
const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
