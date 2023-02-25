import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import imageRouter from './imageRouter.js';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/image', imageRouter);
const socketServer = http.createServer(app);

const io = new Server(socketServer, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	socket.on('connected', (id) => {
		socket.join(id);
		io.in(id).emit('connected', id);
	});

	socket.on('draw', (data) => {
		io.in(data.room).emit('draw', data);
	});

	socket.on('info', (data) => {
		io.in(data.room).emit('info', data);
	});
});

socketServer.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
