import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import '../calender.css';
import type { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { calculationDailyBalances } from '../util/financeCaluculations';
import type { Balance, CalenderContent, Transaction } from '../types';
import { formatCurrency } from '../util/formatting';

interface CalenderProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calender = ({ monthlyTransactions, setCurrentMonth }: CalenderProps) => {
    // カレンダーライブラリで用意されているイベントを作る
    const events = [
        // { title: 'Meeting', start: new Date() },
        { title: 'Meeting', start: '2024-12-18', income: 300, expense: 200, balance: 100 },
        { title: 'Meeting', start: '2024-12-21', income: 600, expense: 400, balance: 400 },
    ];

    const dailyBalances = calculationDailyBalances(monthlyTransactions);
    // console.log(dailyBalances)

    const createCalenderEvents = (dailyBalances: Record<string, Balance>): CalenderContent[] => {
        return Object.keys(dailyBalances).map((date) => {
            const { income, expense, balance } = dailyBalances[date];
            return {
                start: date,
                income: formatCurrency(income),
                expense: formatCurrency(expense),
                balance: formatCurrency(balance),
            };
        });
    };
    const calenderEvents = createCalenderEvents(dailyBalances);
    // console.log(calenderEvents)
    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <div>
                <div className="money" id="event-income">
                    {eventInfo.event.extendedProps.income}
                </div>
                <div className="money" id="event-expense">
                    {eventInfo.event.extendedProps.expense}
                </div>
                <div className="money" id="event-balance">
                    {eventInfo.event.extendedProps.balance}
                </div>
            </div>
        );
    };
	const handleDateSet = (dateSetInfo:DatesSetArg) => {
		setCurrentMonth(dateSetInfo.view.currentStart);
	};
    return (
		<FullCalendar 
			events={calenderEvents} 
			locale={jaLocale} 
			plugins={[dayGridPlugin]} 
			initialView="dayGridMonth" 
			eventContent={renderEventContent} 
			datesSet={handleDateSet}
		/>	
	)
};

export default Calender;
