import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import '../calender.css';
import type { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { calculationDailyBalances } from '../util/financeCaluculations';
import type { Balance, CalenderContent, Transaction } from '../types';
import { formatCurrency } from '../util/formatting';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material';
import { isSameMonth } from 'date-fns';

interface CalenderProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    currentDay: string;
    today: string;
}
const Calender = ({ monthlyTransactions, setCurrentMonth, setCurrentDay, currentDay, today }: CalenderProps) => {
    const theme = useTheme();
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

    const backgroundEvent = {
        start: currentDay,
        end: currentDay,
        display: 'background',
        backgroundColor: theme.palette.primary.light,
    };
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
    const handleDateSet = (dateSetInfo: DatesSetArg) => {
        const currentMonth = dateSetInfo.view.currentStart;
        setCurrentMonth(currentMonth);
        const todayDate = new Date();
        if (isSameMonth(todayDate, currentMonth)) {
            setCurrentDay(today);
        }
    };
    const handleDateClick = (dateInfo: DateClickArg) => {
        setCurrentDay(dateInfo.dateStr);
        // console.log(dateInfo);
    };

    return (
        <FullCalendar
            events={[...calenderEvents, backgroundEvent]}
            locale={jaLocale}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            datesSet={handleDateSet}
            dateClick={handleDateClick}
        />
    );
};

export default Calender;
