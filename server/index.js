import cors from 'cors';
import express from 'express';
import wsExpress from 'express-ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const WSServer = wsExpress(app);
const aWss = WSServer.getWss();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

app.ws('/', (ws, req) => {
	ws.on('message', (msg) => {
		msg = JSON.parse(msg);
		switch (msg.method) {
			case 'connection':
				connectionHandler(ws, msg);
				break;
			case 'draw':
				broadcastConnection(ws, msg);
				break;
		}
	});
});

const connectionHandler = (ws, msg) => {
	ws.id = msg.id;
	broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
	aWss.clients.forEach((client) => {
		if (client.id === msg.id) {
			client.send(JSON.stringify(msg));
		}
	});
};

app.post('/image', (req, res) => {
	try {
		const data = req.body.img.replace('data:image/png;base64,', '');
		fs.writeFileSync(
			path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
			data,
			'base64'
		);
		res.status(200);
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
