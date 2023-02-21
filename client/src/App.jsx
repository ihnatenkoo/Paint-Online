import Canvas from './components/Canvas/Canvas';
import SettingBar from './components/SettingBar/SettingBar';
import ToolBar from './components/ToolBar/ToolBar';

const App = () => {
	return (
		<main>
			<ToolBar />
			<SettingBar />
			<Canvas />
		</main>
	);
};

export default App;
