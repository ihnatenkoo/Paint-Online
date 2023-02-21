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
		toolState.setTool(new Brush(canvasRef.current));
	}, []);

	useEffect(() => {
		if (canvasState.userName) {
			const socket = new WebSocket('ws://localhost:5000');
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
				console.log(event.data);
			};
		}
	}, [canvasState.userName]);

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
