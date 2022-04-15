import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as SessionActions from '../../store/session';

function Calendar({ setCheckInDate, setCheckOutDate, setErrors, checkOutDate, checkInDate, bookedDatesArr }) {
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
  const [bookedDates, setBookedDates] = useState('');
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
    console.log('selecting DATE')
    const selectedDate = parseInt(e.target.innerText);
    if (!firstSelectedDate && checkDateRange(selectedDate)) {
      setFirstSelectedDate(selectedDate);
    } else if (+e.target.innerText > firstSelectedDate && checkDateRange(selectedDate)) {
      setLastSelectedDate(selectedDate);
    }
  };
  
  const checkDateRange = (selectedDate) => {
    for (let i = parseInt(firstSelectedDate); i < selectedDate; i += 1) {
      console.log(selectedDate, i);
      if (bookedDates.includes(i)) {
        return false;
      }
    }
    if (bookedDates.includes(selectedDate) || (bookedDates.includes((selectedDate) + 1) && !firstSelectedDate)) {
      return false;
    }
    return true;
  }

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
      setErrors(false);
    };
    let bookedDates = []
    bookedDatesArr.filter(dateRange => {
      return (dateRange[0].month === month || dateRange[1].month === month);
    })
      .forEach(dateRange => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });
    setBookedDates(bookedDates);
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
    date.setDate(1);
    setMonth(prevState => prevState + 1);
    date.setMonth(month + 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  const prevMonth = () => {
    date.setDate(1);
    setMonth(prevState => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString('default', { month: 'long' }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  const clearCalendar = () => {
    setFirstSelectedDate();
    setLastSelectedDate();
    setCheckInDate('');
    setCheckOutDate('');
  };

  const calendarDays = () => {
    let bookedDates = []
    bookedDatesArr.filter(dateRange => {
      return (dateRange[0].month === month || dateRange[1].month === month);
    })
      .forEach(dateRange => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });

    return days.map(day => {
      let element;
      if ((day - 1 === +firstSelectedDate)
        && firstSelectedDate !== ''
        && lastSelectedDate !== ''
        && +firstSelectedDate + 1 !== +lastSelectedDate) {
        element = <div key={day} className='day-marker clickable-date active-date stretch-left' onClick={selectDate}>{day}</div>
      } else if ((day + 1 === +lastSelectedDate)
        && firstSelectedDate !== ''
        && +firstSelectedDate + 1 !== +lastSelectedDate) {
        element = <><div key={day} className='day-marker clickable-date active-date stretch-right' onClick={selectDate}>{day}</div><div id='stretch-child'></div></>
      } else if (day > firstSelectedDate && day < lastSelectedDate) {
        element = <div key={day} className='day-marker active-date clickable-date' onClick={selectDate}>{day}</div>
      } else if (day === +firstSelectedDate) {
        element = <div key={day} className='day-marker first-date' onClick={selectDate}>{day}</div>
      } else if (day === +lastSelectedDate) {
        element = <div key={day} className='day-marker last-date' onClick={selectDate}>{day}</div>
      } else if (bookedDates.includes(day)) {
        element = <div key={day} className='booked-date'>{day}</div>
      } else if (bookedDates.includes(day + 1) && !firstSelectedDate) {
        element = <div key={day} className='checkout-only-date'>{day}</div>
      } else {
        element = <div key={day} onClick={selectDate} className={!firstSelectedDate || day > firstSelectedDate ? 'clickable-date' : ''}>{day}</div>
      }
      return element;
    })
  }

  return (
  <div className='calendar'>
    <div className="month">      
    <div className='month-header'>
      <span className="prev" onClick={prevMonth}>{'<'}</span>
      <span className="next" onClick={nextMonth}>{'>'}</span>
      <div>
        <span>{monthName}</span><span>{year}</span>
      </div>
    </div>
  </div>

  <div className="weekdays">
    <div>Su</div>
    <div>Mo</div>
    <div>Tu</div>
    <div>We</div>
    <div>Th</div>
    <div>Fr</div>
    <div>Sa</div>
  </div>

  <div className="days">
    {firstDayOfWeekArr.map(day => {
      return <div key={day}></div>
    })}
    {calendarDays()}
  </div>
  <div onClick={clearCalendar} className='day-marker clickable-date-clear'>CLEAR CALENDAR</div>
  </div>
  )
}

export default Calendar;