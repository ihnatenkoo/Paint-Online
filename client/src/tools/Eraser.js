import { Brush } from './Brush';

export class Eraser extends Brush {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.name = 'eraser';
	}

	static staticDraw(ctx, x, y, lineWidth) {
		ctx.strokeStyle = 'white';
		ctx.lineWidth = lineWidth;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
