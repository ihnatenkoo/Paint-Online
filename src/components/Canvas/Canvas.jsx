import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../../store/canvasState';
import s from './Canvas.module.scss';

const Canvas = observer(() => {
	const canvasRef = useRef(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
	}, []);

	return (
		<section className={s.wrapper}>
			<canvas ref={canvasRef} width={600} height={400}></canvas>
		</section>
	);
});

export default Canvas;
