import React from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import Rectangle from '../../tools/Rectangle';
import s from './ToolBar.module.scss';

const ToolBar = () => {
	return (
		<section className={s.tool}>
			<nav className={s.nav}>
				<div className={s.nav__section}>
					<button
						onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
					>
						<span className='material-icons-outlined'>edit</span>
					</button>
					<button
						onClick={() => toolState.setTool(new Rectangle(canvasState.canvas))}
					>
						<span className='material-icons-outlined'>
							check_box_outline_blank
						</span>
					</button>
					<button>
						<span className='material-icons-outlined'>circle</span>
					</button>
					<button>
						<span className='material-icons-outlined'>timeline</span>
					</button>
					<button>
						<span className='material-icons-outlined'>auto_fix_normal</span>
					</button>
					<button>
						<label>
							<span className='material-icons-outlined'>color_lens</span>
							<input type='color' className={s.color_input} />
						</label>
					</button>
				</div>
				<div className={s.nav__section}>
					<button>
						<span className='material-icons-outlined'>undo</span>
					</button>
					<button>
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
