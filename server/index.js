import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import AuthRoutes from './routes/AuthRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.info(`Server listening on ${process.env.PORT}`);
});

global.onlineUsers = new Map();
