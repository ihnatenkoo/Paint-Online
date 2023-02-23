import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../../../store/canvasState';

const DrawMenu = observer(() => {
	const onDownload = () => {
		const dataUrl = canvasState.canvas.toDataURL();
		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = canvasState.sessionId + '.jpg';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div style={{ display: 'flex', gap: '12px' }}>
			<button
				onClick={() => canvasState.undo()}
				disabled={!canvasState.undoList.length}
			>
				<span className='material-icons-outlined'>undo</span>
			</button>
			<button
				onClick={() => canvasState.redo()}
				disabled={!canvasState.redoList.length}
			>
				<span className='material-icons-outlined'>redo</span>
			</button>
			<button onClick={onDownload}>
				<span className='material-icons-outlined'>save</span>
			</button>
		</div>
	);
});

export default DrawMenu;
