import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush } from '../../tools/';
import { drawImg } from '../../utils/drawCertainImg';
import { drawHandler } from '../../utils/drawHandler';
import s from './Canvas.module.scss';

const Canvas = observer(() => {
	const { id } = useParams();
	const canvasRef = useRef(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		drawCurrentCanvas();
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
						drawHandler(canvasRef, msg);
						break;
				}
			};

			socket.onclose = () => {
				console.log('The connection has been closed successfully.');
			};

			return () => socket.close();
		}
	}, [canvasState.userName]);

	const drawCurrentCanvas = async () => {
		let ctx = canvasRef.current.getContext('2d');
		const { data: imageData } = await axios.get(
			`http://localhost:5000/image?id=${id}`
		);
		drawImg(ctx, imageData, canvasRef.current.width, canvasRef.current.height);
	};

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL());
	};

	const mouseUpHandler = () => {
		axios.post(`http://localhost:5000/image?id=${id}`, {
			img: canvasRef.current.toDataURL(),
		});
	};

	return (
		<section className={s.wrapper}>
			<canvas
				onMouseDown={mouseDownHandler}
				onMouseUp={mouseUpHandler}
				ref={canvasRef}
				width={800}
				height={600}
			/>
		</section>
	);
});

export default Canvas;
