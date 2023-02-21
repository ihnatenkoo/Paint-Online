import Canvas from './components/Canvas/Canvas';
import SettingBar from './components/SettingBar/SettingBar';
import StartModal from './components/StartModal/StartModal';
import ToolBar from './components/ToolBar/ToolBar';

const App = () => {
	return (
		<main>
			<StartModal />
			<ToolBar />
			<SettingBar />
			<Canvas />
		</main>
	);
};

export default App;
