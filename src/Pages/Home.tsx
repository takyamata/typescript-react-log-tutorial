import { Box } from '@mui/material';
import React from 'react';
import Calender from '../components/Calender';
import MonthlySummary from '../components/MonthlySummary';
import TransactionForm from '../components/TransactionForm';
import TransactionMenu from '../components/TransactionMenu';
import type { Transaction } from '../types';

interface HomeProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* 左側 */}
            <Box sx={{ flexGrow: '1' }}>
                <MonthlySummary monthlyTransactions={monthlyTransactions} />
                <Calender monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />
            </Box>
            {/* 右側 */}
            <Box>
                <TransactionMenu />
                <TransactionForm />
            </Box>
        </Box>
    );
};

export default Home;
