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
import { format } from 'date-fns';
import { formatMonth } from './util/formatting';

// Firestoreエラーかどうかを判定する型ガード
function isFireStoreError(err: unknown): err is { code: string; message: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
}

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // コレクションのすべてのドキュメントを取得する
    useEffect(() => {
        const fecheTransactions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Transactions'));
                // フェッチしたデータの確認方法
                const transactonsData = querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    } as Transaction;
                });
                // console.log(transactonsData);
                setTransactions(transactonsData);
            } catch (err) {
                if (isFireStoreError(err)) {
                    console.error('Firebaseのエラーは', err);
                    console.error('Firebaseのエラーメッセージは', err.message);
                    console.error('Firebaseのエラーコードは', err.code);
                } else {
                    console.error('一般的なエラーは：', err);
                }
            }
        };
        fecheTransactions();
    }, []);
    // フィルターで今月のデータのみに絞る
    const monthlyTransactions = transactions.filter((transaction) => {
        return transaction.date.startsWith(formatMonth(currentMonth));
    });
    // console.log(monthlyTransactions);
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaselineはMUIが用意しているリセットCSS */}
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />} />
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
