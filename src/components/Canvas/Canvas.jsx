import React from 'react';
import s from './Canvas.module.scss';

const Canvas = () => {
	return (
		<section className={s.wrapper}>
			<canvas width={600} height={400}></canvas>
		</section>
	);
};

export default Canvas;
