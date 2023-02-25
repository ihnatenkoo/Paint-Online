import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import imageRouter from './imageRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/image', imageRouter);
const socketServer = http.createServer(app);

const io = new Server(socketServer, {
	cors: {
		origin: 'http://127.0.0.1:5173',
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
