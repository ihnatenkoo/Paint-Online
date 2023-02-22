import cn from 'classnames';
import React, { useState } from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush, Circle, Eraser, Line, Rectangle } from '../../tools/';
import s from './ToolBar.module.scss';

const ToolBar = () => {
	const [activeTool, setActiveTool] = useState('brush');

	const onClickHandler = (name, tool) => {
		setActiveTool(name);
		toolState.setTool(
			new tool(canvasState.canvas, canvasState.socket, canvasState.sessionId)
		);
	};

	return (
		<section className={s.tool}>
			<nav className={s.nav}>
				<div className={s.nav__section}>
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
				<div className={s.nav__section}>
					<button onClick={() => canvasState.undo()}>
						<span className='material-icons-outlined'>undo</span>
					</button>
					<button onClick={() => canvasState.redo()}>
						<span className='material-icons-outlined'>redo</span>
					</button>
					<button>
						<span className='material-icons-outlined'>save</span>
					</button>
				</div>
			</nav>
		</section>
	);
};

export default ToolBar;
