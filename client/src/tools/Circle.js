import toolState from '../store/toolState';
import Tool from './Tool';

export class Circle extends Tool {
	constructor(canvas, socked, id) {
		super(canvas, socked, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
		this.socket.send(
			JSON.stringify({
				method: 'draw',
				id: this.id,
				figure: {
					type: 'circle',
					x: this.startX,
					y: this.startY,
					r: this.r,
					strokeWidth: this.ctx.lineWidth,
					stroke: this.ctx.strokeStyle,
					fill: this.ctx.fillStyle,
				},
			})
		);
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.fillStyle = toolState.fillStyle;
		this.ctx.strokeStyle = toolState.strokeStyle;
		this.ctx.lineWidth = toolState.lineWidth;
		let canvasData = this.canvas.toDataURL();
		this.ctx.beginPath();
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;
		this.saved = canvasData;
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft;
			let currentY = e.pageY - e.target.offsetTop;
			let width = currentX - this.startX;
			let height = currentY - this.startY;
			this.r = Math.sqrt(width ** 2 + height ** 2);
			this.draw(this.startX, this.startY, this.r);
		}
	}

	draw(x, y, r) {
		const img = new Image();
		img.src = this.saved;
		img.onload = function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.stroke();
		}.bind(this);
	}

	static staticDraw(ctx, x, y, r, strokeWidth, stroke, fill) {
		ctx.beginPath();
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = strokeWidth;
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}
