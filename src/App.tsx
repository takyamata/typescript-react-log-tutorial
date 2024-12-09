import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './components/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { Transaction } from './types/index';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // コレクションのすべてのドキュメントを取得する
    useEffect(() => {
        const fecheTransactions = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, 'Transactions')
                );
                // フェッチしたデータの確認方法
                const transactonsData = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    } as Transaction;
                });
                console.log(transactonsData);
                setTransactions(transactonsData);
            } catch (err) {
                // error
            }
        };
        fecheTransactions();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaselineはMUIが用意しているリセットCSS */}
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/report" element={<Report />} />
                        {/* URLがマッチしなかった場合に表示されるページ */}
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
