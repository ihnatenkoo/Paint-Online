import { makeAutoObservable } from 'mobx';

class ToolState {
	tool = null;

	constructor() {
		makeAutoObservable(this);
		this.strokeStyle = '#000000';
		this.fillStyle = '#000000';
		this.lineWidth = 1;
	}

	setTool(tool) {
		this.tool = tool;
	}

	setFillStyle(color) {
		this.fillStyle = color;
	}

	setStrokeStyle(color) {
		this.strokeStyle = color;
	}

	setLineWidth(width) {
		this.lineWidth = width;
	}
}

export default new ToolState();
