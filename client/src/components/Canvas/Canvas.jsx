import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import canvasState from '../../store/canvasState';
import { appSocket } from '../../utils/appSocket';
import { drawImg } from '../../utils/drawCertainImg';
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
			const socket = appSocket(canvasRef, id);
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

	const mouseUpHandler = async () => {
		await axios.post(`http://localhost:5000/image?id=${id}`, {
			img: canvasRef.current.toDataURL(),
		});
	};

	return (
		<section className={s.wrapper}>
			<ToastContainer className={s.toast} hideProgressBar={true} />
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
