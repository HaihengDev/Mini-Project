import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import productRouter from './routes/product.route';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(productRouter);

const server = createServer(app);
const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
