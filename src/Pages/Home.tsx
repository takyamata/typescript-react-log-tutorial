import { Box } from '@mui/material';
import React, { useState } from 'react';
import Calender from '../components/Calender';
import MonthlySummary from '../components/MonthlySummary';
import TransactionForm from '../components/TransactionForm';
import TransactionMenu from '../components/TransactionMenu';
import type { Transaction } from '../types';
import { formatDate } from 'date-fns';

interface HomeProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
    const today = formatDate(new Date(), 'yyyy-MM-dd');
    const [currentDay, setCurrentDay] = useState(today);
    const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });
    // console.log(dailyTransactions);
    const closeForm = () => {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
    };
    const onAddTransactionForm = () => {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
    };
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            {/* 左側 */}
            <Box
                sx={{
                    flexGrow: '1',
                }}
            >
                <MonthlySummary monthlyTransactions={monthlyTransactions} />
                <Calender
                    monthlyTransactions={monthlyTransactions}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentDay={setCurrentDay}
                    currentDay={currentDay}
                    today={today}
                />
            </Box>
            {/* 右側 */}
            <Box>
                <TransactionMenu
                    dailyTransactions={dailyTransactions}
                    currentDay={currentDay}
                    onAddTransactionForm={onAddTransactionForm}
                />
                <TransactionForm
                    onCloseForm={closeForm}
                    isEntryDrawerOpen={isEntryDrawerOpen}
                    currentDay={currentDay}
                />
            </Box>
        </Box>
    );
};

export default Home;
