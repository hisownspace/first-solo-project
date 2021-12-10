import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as SessionActions from '../../store/session';

function Calendar({ setCheckInDate, setCheckOutDate, checkOutDate, checkInDate }) {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthName, setMonthName] = useState(date.toLocaleString('default', { month: 'long' }));
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState('');
  const [lastSelectedDate, setLastSelectedDate] = useState('');
  // const [checkinDate, setCheckinDate] = useState();
  // const [checkoutDate, setCheckoutDate] = useState();

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
    } else if (+e.target.innerText > firstSelectedDate) {
      setLastSelectedDate(selectedDate);
    }
  };
  
  useEffect(() => {
    let tempCheckIn;
    let tempCheckOut;
    let tempMonth = month.toString();
    if (tempMonth.length === 1) {
      tempMonth = '0' + (month + 1);
    } else {
      tempMonth = month + 1;
    }
    if (firstSelectedDate < 10) {
      tempCheckIn = '0' + firstSelectedDate;
    } else {
      tempCheckIn = firstSelectedDate;
    }
    if (lastSelectedDate < 10) {
      tempCheckOut = '0' + lastSelectedDate;
    } else {
      tempCheckOut = lastSelectedDate;
    }
    tempCheckIn =`${year}-${tempMonth}-${tempCheckIn}`
    tempCheckOut =`${year}-${tempMonth}-${tempCheckOut}`
    
    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckIn)) {
      setCheckInDate(tempCheckIn);
    }
    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckOut)) {
      setCheckOutDate(tempCheckOut);
    }
  }, [firstSelectedDate, lastSelectedDate, month, year]);

  useEffect(() => {
    console.log(checkOutDate.slice(8,10));
    if (checkOutDate) {
      setLastSelectedDate(checkOutDate.slice(8,10));
    }
    if (checkInDate) {
      setFirstSelectedDate(checkInDate.slice(8,10));
    }
  }, [checkOutDate, checkInDate]);

  const nextMonth = () => {
    setMonth(prevState => prevState + 1);
    date.setMonth(month + 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  const prevMonth = () => {
    setMonth(prevState => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  useEffect(() => {

  }, [firstSelectedDate]);

  const clearCalendar = () => {
    setFirstSelectedDate();
    setLastSelectedDate();
    setCheckInDate('');
    setCheckOutDate('');
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