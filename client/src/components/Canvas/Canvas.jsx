import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush } from '../../tools/';
import s from './Canvas.module.scss';

const Canvas = observer(() => {
	const { id } = useParams();
	const canvasRef = useRef(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
	}, []);

	useEffect(() => {
		if (canvasState.userName) {
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
						console.log(`User ${msg.username} connected`);
						break;
					case 'draw':
						drawHandler(msg);
						break;
				}
			};
		}
	}, [canvasState.userName]);

	const drawHandler = (msg) => {
		const figure = msg.figure;
		const ctx = canvasRef.current.getContext('2d');
		switch (figure.type) {
			case 'brush':
				Brush.draw(ctx, figure.x, figure.y);
				break;
			case 'finish':
				ctx.beginPath();
		}
	};

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL());
	};

	return (
		<section className={s.wrapper}>
			<canvas
				onMouseDown={mouseDownHandler}
				ref={canvasRef}
				width={600}
				height={400}
			></canvas>
		</section>
	);
});

export default Canvas;
