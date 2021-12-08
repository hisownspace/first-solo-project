import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as SessionActions from '../../store/session';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.toLocaleString('default', { month: 'long' }));
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState();
  const [lastSelectedDate, setLastSelectedDate] = useState();

  useEffect(() => {
    date.setDate(1);
    setFirstDayOfWeek(date.getDay());
    setFirstDayOfWeekArr([]);
    for (let i = 0; i < firstDayOfWeek; i += 1) {
      setFirstDayOfWeekArr(prevState => {return [...prevState, i]});
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(-1);
    setLastDay(date.getDate());
    setDays([]);
    for (let i = 1; i <= lastDay; i += 1) {
      setDays(prevState => {return [...prevState, i]});
    }
  }, [lastDay]);

  const selectDate = e => {
    if (!firstSelectedDate) {
      setFirstSelectedDate(e.target.innerText);
    } else {
      setLastSelectedDate(e.target.innerText);
    }
  };

  const nextMonth = () => {
    date.setMonth(date.getMonth() + 1)
    setMonth(date.getMonth());
  };

  useEffect(() => {

  }, [firstSelectedDate]);

  const clearCalendar = () => {
    setFirstSelectedDate();
    setLastSelectedDate();
  };

  return (
  <div className='calendar'>
    <div className="month">      
    <ul>
      <li className="prev">{'<'}</li>
      <li className="next" onClick={nextMonth}>{'>'}</li>
      <li>
        {month}<br />
        <span>2021</span>
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
        element = <li key={day} className='calendar-date active' onClick={selectDate}>{day}</li>
      } else if (day === +firstSelectedDate) {
        element = <li key={day} className='calendar-date first-date' onClick={selectDate}>{day}</li>
      } else if (day === +lastSelectedDate) {
        element = <li key={day} className='calendar-date last-date' onClick={selectDate}>{day}</li>
      } else {
        element = <li key={day} onClick={selectDate}>{day}</li>
      }
      return element;
    })}
  </ul>
  <div onClick={clearCalendar}>CLEAR</div>
  </div>
  )
}

export default Calendar;