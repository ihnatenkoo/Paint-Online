import { Brush } from './Brush';

export class Eraser extends Brush {
	constructor(canvas, socket, room) {
		super(canvas, socket, room);
		this.name = 'eraser';
	}

	static staticDraw(ctx, x, y, lineWidth) {
		ctx.strokeStyle = 'white';
		ctx.lineWidth = lineWidth;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
