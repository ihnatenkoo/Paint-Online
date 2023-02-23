import React from 'react';
import DrawMenu from './DrawMenu/DrawMenu';
import DrawTool from './DrawTools/DrawTools';
import s from './ToolBar.module.scss';

const ToolBar = () => {
	return (
		<section className={s.section}>
			<nav className={s.nav}>
				<DrawTool />
				<DrawMenu />
			</nav>
		</section>
	);
};

export default ToolBar;
