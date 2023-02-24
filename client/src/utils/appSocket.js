import { toast } from 'react-toastify';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import { Brush } from '../tools';
import { drawHandler } from './drawHandler';

export const appSocket = (canvasRef, id) => {
	const socket = new WebSocket('ws://localhost:5000');
	canvasState.setSocket(socket);
	canvasState.setSessionId(id);
	toolState.setTool(new Brush(canvasRef.current, socket, id));

	socket.onopen = () => {
		socket.send(
			JSON.stringify({
				id,
				username: canvasState.userName,
				method: 'connection',
			})
		);
	};

	socket.onmessage = (event) => {
		let msg = JSON.parse(event.data);
		switch (msg.method) {
			case 'connection':
				toast.success(`${msg.username} online`);
				break;
			case 'info':
				toast.info(`${msg.text}`);
				break;
			case 'draw':
				drawHandler(canvasRef, msg);
				break;
		}
	};

	socket.onclose = () => {
		console.log('The connection has been closed successfully.');
	};

	return socket;
};
