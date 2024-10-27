import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Report from './Pages/Report';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/report" element={<Report/>} />
			</Routes>
		</Router>
	);
}

export default App;
