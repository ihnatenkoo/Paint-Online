import React from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import { Brush, Circle, Eraser, Line, Rectangle } from '../../tools/';
import s from './ToolBar.module.scss';

const ToolBar = () => {
	const onChangeColor = (e) => {
		toolState.setFillStyle(e.target.value);
	};

	return (
		<section className={s.tool}>
			<nav className={s.nav}>
				<div className={s.nav__section}>
					<button
						onClick={() =>
							toolState.setTool(
								new Brush(
									canvasState.canvas,
									canvasState.socket,
									canvasState.sessionId
								)
							)
						}
					>
						<span className='material-icons-outlined'>edit</span>
					</button>
					<button
						onClick={() =>
							toolState.setTool(
								new Rectangle(
									canvasState.canvas,
									canvasState.socket,
									canvasState.sessionId
								)
							)
						}
					>
						<span className='material-icons-outlined'>
							check_box_outline_blank
						</span>
					</button>
					<button
						onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
					>
						<span className='material-icons-outlined'>circle</span>
					</button>
					<button
						onClick={() => toolState.setTool(new Line(canvasState.canvas))}
					>
						<span className='material-icons-outlined'>timeline</span>
					</button>
					<button
						onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
					>
						<span className='material-icons-outlined'>auto_fix_normal</span>
					</button>
					<button>
						<label>
							<span className='material-icons-outlined'>color_lens</span>
							<input
								onChange={onChangeColor}
								type='color'
								className={s.color_input}
							/>
						</label>
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
