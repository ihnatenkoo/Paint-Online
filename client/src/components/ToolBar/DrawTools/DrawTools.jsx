import cn from 'classnames';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import canvasState from '../../../store/canvasState';
import toolState from '../../../store/toolState';
import { Brush, Circle, Eraser, Line, Rectangle } from '../../../tools';
import s from './DrawTools.module.scss';

const DrawTool = () => {
	const [activeTool, setActiveTool] = useState('brush');
	const { id: room } = useParams();

	const onClickHandler = (toolName, tool) => {
		canvasState.socket.emit('info', {
			room,
			text: `${canvasState.userName} chose ${toolName}`,
		});

		setActiveTool(toolName);
		toolState.setTool(
			new tool(canvasState.canvas, canvasState.socket, canvasState.sessionId)
		);
	};
	return (
		<div className={s.nav}>
			<button onClick={() => onClickHandler('brush', Brush)}>
				<span
					className={cn('material-icons-outlined', {
						[s.active]: activeTool === 'brush',
					})}
				>
					edit
				</span>
			</button>
			<button onClick={() => onClickHandler('rectangle', Rectangle)}>
				<span
					className={cn('material-icons-outlined', {
						[s.active]: activeTool === 'rectangle',
					})}
				>
					check_box_outline_blank
				</span>
			</button>
			<button onClick={() => onClickHandler('circle', Circle)}>
				<span
					className={cn('material-icons-outlined', {
						[s.active]: activeTool === 'circle',
					})}
				>
					circle
				</span>
			</button>
			<button onClick={() => onClickHandler('line', Line)}>
				<span
					className={cn('material-icons-outlined', {
						[s.active]: activeTool === 'line',
					})}
				>
					timeline
				</span>
			</button>
			<button onClick={() => onClickHandler('eraser', Eraser)}>
				<span
					className={cn('material-icons-outlined', {
						[s.active]: activeTool === 'eraser',
					})}
				>
					auto_fix_normal
				</span>
			</button>
		</div>
	);
};

export default DrawTool;
