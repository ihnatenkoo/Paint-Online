import toolState from '../store/toolState';
import Tool from './Tool';

export class Rectangle extends Tool {
	constructor(canvas, socket, room) {
		super(canvas, socket, room);
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
			room: this.room,
			figure: {
				type: 'rectangle',
				x: this.startX,
				y: this.startY,
				width: this.width,
				height: this.height,
				fill: this.ctx.fillStyle,
				stroke: this.ctx.strokeStyle,
				strokeWidth: this.ctx.lineWidth,
			},
		});
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.fillStyle = toolState.fillStyle;
		this.ctx.strokeStyle = toolState.strokeStyle;
		this.ctx.lineWidth = toolState.lineWidth;
		this.ctx.beginPath();
		this.startX = e.pageX - e.target.offsetLeft;
		this.startY = e.pageY - e.target.offsetTop;
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			let currentX = e.pageX - e.target.offsetLeft;
			let currentY = e.pageY - e.target.offsetTop;
			this.width = currentX - this.startX;
			this.height = currentY - this.startY;
			this.draw(this.startX, this.startY, this.width, this.height);
		}
	}

	draw(x, y, w, h) {
		const img = new Image();
		img.src = this.saved;
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.rect(x, y, w, h);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	static staticDraw(ctx, x, y, w, h, strokeWidth, stroke, fill) {
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = strokeWidth;
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.fill();
		ctx.stroke();
	}
}
