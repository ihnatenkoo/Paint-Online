import cors from 'cors';
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
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
		io.in(data.id).emit('draw', data);
	});

	socket.on('info', (data) => {
		io.in(data.id).emit('info', data);
	});
});

socketServer.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

app.post('/image', (req, res) => {
	try {
		const data = req.body.img.replace('data:image/png;base64,', '');
		fs.writeFileSync(
			path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
			data,
			'base64'
		);

		res.status(200).json({ message: 'Image saved' });
	} catch (error) {
		res.status(500).json(error);
	}
});

app.get('/image', (req, res) => {
	try {
		const file = fs.readFileSync(
			path.resolve(__dirname, 'files', `${req.query.id}.jpg`)
		);
		const data = `data:image/png;base64,` + file.toString('base64');
		res.json(data);
	} catch (error) {
		return res.status(500).json(error);
	}
});
