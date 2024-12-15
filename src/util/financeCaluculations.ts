import type { Balance, Transaction } from '../types';

export function financeCaluculations(transactions: Transaction[]): Balance {
    // reduceは繰り返し処理
    return transactions.reduce(
        (acc, transaction) => {
            if (transaction.type == 'income') {
                acc.income += transaction.amount;
            } else {
                acc.expense += transaction.amount;
            }
            acc.balance = acc.income - acc.expense;
            return acc;
        },
        { income: 0, expense: 0, balance: 0 }
    );
}

// 日付ごとの収支を計算する関数

export function calculationDailyBalances(transactions: Transaction[]): Record<string, Balance> {
	return (
        transactions.reduce <Record<string, Balance>>((acc, transaction) => {
            const day = transaction.date;
            if (!acc[day]) {
                acc[day] = { income: 0, expense: 0, balance: 0 };
            }
			if(transaction.type === "income") {
				acc[day].income += transaction.amount;
			} else {
				acc[day].expense += transaction.amount;
			}
			acc[day].balance = acc[day].income - acc[day].expense
			return acc
        }, {})
    );
	// 下記のようなデータが入る
    // {
    // 	"2024-12-18" : {income: 700, expense: 200, balance: 500},
    // 	"2024-12-21" : {income: 0, expense: 500, balance: -500},
    // };
};