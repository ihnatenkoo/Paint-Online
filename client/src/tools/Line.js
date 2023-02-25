import toolState from '../store/toolState';
import Tool from './Tool';

export class Line extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id);
		this.listen();
	}

	listen() {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(e) {
		this.mouseDown = false;
		this.socket.emit('draw', {
			id: this.id,
			figure: {
				type: 'line',
				x: this.x,
				y: this.y,
				currentX: this.currentX,
				currentY: this.currentY,
				color: this.ctx.strokeStyle,
				width: this.ctx.lineWidth,
			},
		});
	}

	mouseDownHandler(e) {
		this.mouseDown = true;
		this.ctx.strokeStyle = toolState.strokeStyle;
		this.ctx.lineWidth = toolState.lineWidth;
		this.currentX = e.pageX - e.target.offsetLeft;
		this.currentY = e.pageY - e.target.offsetTop;
		this.ctx.beginPath();
		this.ctx.moveTo(this.currentX, this.currentY);
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.x = e.pageX - e.target.offsetLeft;
			this.y = e.pageY - e.target.offsetTop;
			this.draw(this.x, this.y);
		}
	}

	draw(x, y) {
		const img = new Image();
		img.src = this.saved;
		img.onload = function () {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			this.ctx.beginPath();
			this.ctx.moveTo(this.currentX, this.currentY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}.bind(this);
	}

	static staticDraw(ctx, x, y, currentX, currentY, color, lineWidth) {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.beginPath();
		ctx.moveTo(currentX, currentY);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
