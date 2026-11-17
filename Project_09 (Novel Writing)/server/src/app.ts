import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8888;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
  });
}

startServer();
