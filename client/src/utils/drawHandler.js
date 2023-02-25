import { Brush, Circle, Eraser, Line, Rectangle } from '../tools/';
import { drawImg } from './drawCertainImg';

export const drawHandler = (canvas, msg) => {
	const figure = msg.figure;
	const ctx = canvas.getContext('2d');
	switch (figure.type) {
		case 'brush':
			Brush.staticDraw(ctx, figure.x, figure.y, figure.color, figure.width);
			break;
		case 'rectangle':
			Rectangle.staticDraw(
				ctx,
				figure.x,
				figure.y,
				figure.width,
				figure.height,
				figure.strokeWidth,
				figure.stroke,
				figure.fill
			);
			ctx.beginPath();
			break;
		case 'circle':
			Circle.staticDraw(
				ctx,
				figure.x,
				figure.y,
				figure.r,
				figure.strokeWidth,
				figure.stroke,
				figure.fill
			);
			break;
		case 'line':
			Line.staticDraw(
				ctx,
				figure.x,
				figure.y,
				figure.currentX,
				figure.currentY,
				figure.color,
				figure.width
			);
			break;
		case 'eraser':
			Eraser.staticDraw(ctx, figure.x, figure.y, figure.width);
			break;
		case 'undo-redo':
			drawImg(ctx, figure.img, msg.canvasWidth, msg.canvasHeight);
			break;
		case 'finish':
			ctx.beginPath();
	}
};
