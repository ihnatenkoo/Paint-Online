import { makeAutoObservable } from 'mobx';

class CanvasState {
	canvas = null;
	userName = null;
	socket = null;
	sessionId = null;
	undoList = [];
	redoList = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}

	setUserName(userName) {
		this.userName = userName;
	}

	setSocket(socket) {
		this.socket = socket;
	}

	setSessionId(sessionId) {
		this.sessionId = sessionId;
	}

	pushToUndo(data) {
		this.undoList.push(data);
	}

	pushToRedo(data) {
		this.redoList.push(data);
	}

	undo() {
		if (this.undoList.length > 0) {
			let ctx = this.canvas.getContext('2d');
			let dataUrl = this.undoList.pop();
			this.redoList.push(this.canvas.toDataURL());
			let img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
			this.socket.send(
				JSON.stringify({
					method: 'draw',
					id: this.sessionId,
					figure: {
						type: 'undo-redo',
						img: dataUrl,
					},
					canvasWidth: this.canvas.width,
					canvasHeight: this.canvas.height,
				})
			);
		}
	}

	redo() {
		let ctx = this.canvas.getContext('2d');
		if (this.redoList.length > 0) {
			let dataUrl = this.redoList.pop();
			this.undoList.push(this.canvas.toDataURL());
			let img = new Image();
			img.src = dataUrl;
			img.onload = () => {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			};
			this.socket.send(
				JSON.stringify({
					method: 'draw',
					id: this.sessionId,
					figure: {
						type: 'undo-redo',
						img: dataUrl,
					},
					canvasWidth: this.canvas.width,
					canvasHeight: this.canvas.height,
				})
			);
		}
	}
}

export default new CanvasState();
