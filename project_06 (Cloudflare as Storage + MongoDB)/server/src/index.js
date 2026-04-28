import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const server = createServer(app);
const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
