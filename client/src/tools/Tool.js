export default class Tool {
	constructor(canvas, socket, room) {
		this.canvas = canvas;
		this.socket = socket;
		this.room = room;
		this.ctx = canvas.getContext('2d');
		this.destroyEvents();
	}

	destroyEvents() {
		this.canvas.onmousemove = null;
		this.canvas.onmousedown = null;
		this.canvas.onmouseup = null;
	}
}
