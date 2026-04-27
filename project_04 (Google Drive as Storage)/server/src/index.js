import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const server = createServer(app);
const PORT = process.env.PORT || '8888';

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
