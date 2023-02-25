import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../../../store/canvasState';
import { onDownloadCanvas } from '../../../utils/onDownloadCanvas';

const DrawMenu = observer(() => {
	const onDownloadHandler = () => {
		onDownloadCanvas(canvasState.canvas, canvasState.sessionId);
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
			<button onClick={onDownloadHandler}>
				<span className='material-icons-outlined'>save</span>
			</button>
		</div>
	);
});

export default DrawMenu;
