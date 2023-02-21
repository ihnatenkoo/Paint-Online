import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush } from '../../tools/';
import s from './Canvas.module.scss';

const Canvas = observer(() => {
	const canvasRef = useRef(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		toolState.setTool(new Brush(canvasRef.current));
	}, []);

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
