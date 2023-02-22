import Tool from './Tool';

export class Brush extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(
			e.pageX - e.target.offsetLeft,
			e.pageY - e.target.offsetTop
		);
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.socket.send(
				JSON.stringify({
					method: 'draw',
					id: this.id,
					figure: {
						type: 'brush',
						x: e.pageX - e.target.offsetLeft,
						y: e.pageY - e.target.offsetTop,
					},
				})
			);
		}
	}

	static draw(ctx, x, y) {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
