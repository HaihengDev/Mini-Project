import express from 'express';
import { createServer } from 'http';

const app = express();
app.use(express.json());

const server = createServer(app);
const PORT = 8888;

server.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}...`);
});
