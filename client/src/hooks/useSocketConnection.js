import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import canvasState from '../store/canvasState';
import { drawHandler } from '../utils/drawHandler';

const socket = io('ws://localhost:5000');

export const useSocketConnection = (room) => {
	const userName = canvasState.userName;
	const socketRef = useRef();
	socketRef.current = socket;
	canvasState.socket = socket;
	canvasState.sessionId = room;

	useEffect(() => {
		if (!socketRef.current || !userName) {
			return;
		}

		socketRef.current.emit('connected', room);
		socketRef.current.on('connected', () => {
			toast.success(`${userName} joined`);
		});

		socketRef.current.on('draw', (data) => {
			drawHandler(canvasState.canvas, data);
		});

		socketRef.current.on('info', (data) => {
			toast.info(data.text);
		});

		return () => {
			if (!socketRef.current) {
				return;
			}

			socketRef.current.off('connected');
			socketRef.current.off('draw');
			socketRef.current.off('info');
		};
	}, [userName]);

	return { socket: socketRef.current };
};
