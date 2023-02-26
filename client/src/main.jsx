import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/:id' element={<App />} />
				<Route
					path='*'
					element={<Navigate to={crypto.randomUUID()} replace />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
