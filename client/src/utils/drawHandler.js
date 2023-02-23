import { Brush, Circle, Eraser, Line, Rectangle } from '../tools/';

export const drawHandler = (canvasRef, msg) => {
	const figure = msg.figure;
	const ctx = canvasRef.current.getContext('2d');
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
			let img = new Image();
			img.src = figure.img;
			img.onload = () => {
				ctx.clearRect(0, 0, msg.canvasWidth, msg.canvasHeight);
				ctx.drawImage(img, 0, 0, msg.canvasWidth, msg.canvasHeight);
			};
			break;
		case 'finish':
			ctx.beginPath();
	}
};
