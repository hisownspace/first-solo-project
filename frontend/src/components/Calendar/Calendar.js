import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as SessionActions from '../../store/session';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthName, setMonthName] = useState(date.toLocaleString('default', { month: 'long' }));
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState();
  const [lastSelectedDate, setLastSelectedDate] = useState();
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();

  useEffect(() => {
    date.setDate(1);
    setFirstDayOfWeek(date.getDay());
    setFirstDayOfWeekArr([]);
    for (let i = 1; i <= firstDayOfWeek; i += 1) {
      setFirstDayOfWeekArr(prevState => {return [...prevState, i]});
      if (i === 7) {setFirstDayOfWeekArr([])}
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(-1);
    setLastDay(date.getDate() + 1);
    setDays([]);
    for (let i = 1; i <= lastDay; i += 1) {
      setDays(prevState => {return [...prevState, i]});
    }
    setYear(date.getFullYear());
  }, [lastDay, date]);

  const selectDate = e => {
    const selectedDate = parseInt(e.target.innerText);
    if (!firstSelectedDate /* && bookedDate !== selectedDate */) {
      setFirstSelectedDate(selectedDate);
    } else if (!lastSelectedDate || +e.target.innerText > firstSelectedDate) {
      setLastSelectedDate(selectedDate);
    }
  };
  
  useEffect(() => {
    setCheckinDate(new Date(year, month, firstSelectedDate, 4));
    setCheckoutDate(new Date(year, month, lastSelectedDate, 11));
    console.log(monthName)
  }, [firstSelectedDate, lastSelectedDate, month, year]);

  const nextMonth = () => {
    setMonth(prevState => prevState + 1);
    date.setMonth(month + 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    console.log(month);
    console.log(date);
    setLastDay(0);
    clearCalendar();
  };

  const prevMonth = () => {
    setMonth(prevState => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    console.log(month);
    console.log(date);
    setLastDay(0);
    clearCalendar();
  };

  useEffect(() => {

  }, [firstSelectedDate]);

  const clearCalendar = () => {
    setFirstSelectedDate();
    setLastSelectedDate();
    setCheckinDate();
    setCheckoutDate();
  };

  return (
  <div className='calendar'>
    <div className="month">      
    <ul>
      <li className="prev" onClick={prevMonth}>{'<'}</li>
      <li className="next" onClick={nextMonth}>{'>'}</li>
      <li>
        {monthName}<br />
        <span>{year}</span>
      </li>
    </ul>
  </div>

  <ul className="weekdays">
    <li>Su</li>
    <li>Mo</li>
    <li>Tu</li>
    <li>We</li>
    <li>Th</li>
    <li>Fr</li>
    <li>Sa</li>
  </ul>

  <ul className="days">
    {firstDayOfWeekArr.map(day => {
      return <li key={day}></li>
    })}
    {days.map(day => {
      let element;
      if (day > firstSelectedDate && day < lastSelectedDate) {
        element = <li key={day} className='clickable-date active-date' onClick={selectDate}>{day}</li>
      } else if (day === +firstSelectedDate) {
        element = <li key={day} className='first-date' onClick={selectDate}>{day}</li>
      } else if (day === +lastSelectedDate) {
        element = <li key={day} className='last-date' onClick={selectDate}>{day}</li>
      } else {
        element = <li key={day} onClick={selectDate} className={!firstSelectedDate || day > firstSelectedDate ? 'clickable-date' : ''}>{day}</li>
      }
      return element;
    })}
  </ul>
  <div onClick={clearCalendar} className='clickable-date'>CLEAR CALENDAR</div>
  </div>
  )
}

export default Calendar;