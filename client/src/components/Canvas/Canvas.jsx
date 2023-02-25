import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSocketConnection } from '../../hooks/useSocketConnection';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush } from '../../tools';
import { drawCertainImg } from '../../utils/drawCertainImg';
import s from './Canvas.module.scss';

const Canvas = observer(() => {
	const { id: room } = useParams();
	const { socket } = useSocketConnection(room);
	const canvasRef = useRef(null);

	useEffect(() => {
		toolState.setTool(new Brush(canvasRef.current, socket, room));
		canvasState.canvas = canvasRef.current;
		drawSavedCanvas(canvasRef.current);
	}, []);

	const mouseDownHandler = (canvas) => {
		canvasState.pushToUndo(canvas.toDataURL());
	};

	const mouseUpHandler = async (canvas) => {
		await axios.post(`http://localhost:5000/image?id=${room}`, {
			img: canvas.toDataURL(),
		});
	};

	const drawSavedCanvas = async (canvas) => {
		let ctx = canvas.getContext('2d');
		const { data: imageData } = await axios.get(
			`http://localhost:5000/image?id=${room}`
		);
		drawCertainImg(
			ctx,
			imageData,
			canvasRef.current.width,
			canvasRef.current.height
		);
	};

	return (
		<section className={s.wrapper}>
			<ToastContainer className={s.toast} hideProgressBar={true} />
			<canvas
				onMouseDown={() => mouseDownHandler(canvasRef.current)}
				onMouseUp={() => mouseUpHandler(canvasRef.current)}
				ref={canvasRef}
				width={800}
				height={600}
			/>
		</section>
	);
});

export default Canvas;
