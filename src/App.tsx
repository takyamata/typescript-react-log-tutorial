import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './components/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

function App() {
	return (
		<ThemeProvider
			theme={theme}
		>
			{/* CssBaselineはMUIが用意しているリセットCSS */}
			<CssBaseline/>
			<Router>
				<Routes>
					<Route path='/' element={<AppLayout/>}>
						<Route index element={<Home/>} />
						<Route path="/report" element={<Report/>} />
						{/* URLがマッチしなかった場合に表示されるページ */}
						<Route path="*" element={<NoMatch/>} />
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
