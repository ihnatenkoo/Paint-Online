import React from 'react';
import toolState from '../../store/toolState';
import s from './SettingBar.module.scss';

const SettingBar = () => {
	return (
		<section className={s.bar}>
			<label htmlFor='line-width'>Line Width:</label>
			<input
				onChange={(e) => toolState.setLineWidth(e.target.value)}
				style={{ marginLeft: '12px', width: '40px', textAlign: 'center' }}
				id='line-width'
				type='number'
				min={1}
				max={50}
				defaultValue={1}
			/>
			<label
				htmlFor='stroke-color'
				style={{ marginLeft: '24px', marginRight: '8px' }}
			>
				Stroke Color:
			</label>
			<input
				onChange={(e) => toolState.setStrokeStyle(e.target.value)}
				id='stroke-color'
				type='color'
			/>
			<label
				htmlFor='fill-color'
				style={{ marginLeft: '24px', marginRight: '8px' }}
			>
				Fill Color:
			</label>
			<input
				onChange={(e) => toolState.setFillStyle(e.target.value)}
				id='fill-color'
				type='color'
			/>
		</section>
	);
};

export default SettingBar;
