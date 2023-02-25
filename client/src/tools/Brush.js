import toolState from '../store/toolState';
import Tool from './Tool';

export class Brush extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.name = 'brush';
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
		this.socket.emit('draw', {
			id: this.id,
			figure: {
				type: 'finish',
			},
		});
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.strokeStyle = toolState.strokeStyle;
		this.ctx.lineWidth = toolState.lineWidth;
		this.ctx.beginPath();
		this.ctx.moveTo(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		);
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.socket.emit('draw', {
				id: this.id,
				figure: {
					type: this.name,
					x: e.pageX - e.target.offsetLeft,
					y: e.pageY - e.target.offsetTop,
					color: this.ctx.strokeStyle,
					width: this.ctx.lineWidth,
				},
			});
		}
	}

	static staticDraw(ctx, x, y, color, lineWidth) {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
