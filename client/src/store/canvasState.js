import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { drawCertainImg } from '../utils/drawCertainImg';

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

	pushToUndo(data) {
		this.undoList.push(data);
	}

	pushToRedo(data) {
		this.redoList.push(data);
	}

	undo() {
		if (this.undoList.length > 0) {
			let ctx = this.canvas.getContext('2d');
			let imageData = this.undoList.pop();
			this.redoList.push(this.canvas.toDataURL());

			drawCertainImg(ctx, imageData, this.canvas.width, this.canvas.height);

			axios.post(`${import.meta.env.VITE_API_URL}/image?id=${this.sessionId}`, {
				img: imageData,
			});

			this.socket.emit('draw', {
				id: this.sessionId,
				figure: {
					type: 'undo-redo',
					img: imageData,
				},
				canvasWidth: this.canvas.width,
				canvasHeight: this.canvas.height,
			});
		}
	}

	redo() {
		if (this.redoList.length > 0) {
			let ctx = this.canvas.getContext('2d');
			let imageData = this.redoList.pop();
			this.undoList.push(this.canvas.toDataURL());

			drawCertainImg(ctx, imageData, this.canvas.width, this.canvas.height);
			axios.post(`${import.meta.env.VITE_API_URL}/image?id=${this.sessionId}`, {
				img: imageData,
			});

			this.socket.emit('draw', {
				id: this.sessionId,
				figure: {
					type: 'undo-redo',
					img: imageData,
				},
				canvasWidth: this.canvas.width,
				canvasHeight: this.canvas.height,
			});
		}
	}
}

export default new CanvasState();
