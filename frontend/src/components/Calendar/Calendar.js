import { useEffect, useState } from "react";

function Calendar({
  setCheckInDate,
  setCheckOutDate,
  setErrors,
  checkOutDate,
  checkInDate,
  bookedDatesArr,
}) {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthName, setMonthName] = useState(
    date.toLocaleString("default", { month: "long" }),
  );
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");
  const [bookedDates, setBookedDates] = useState("");

  useEffect(() => {
    clearCalendar();
    date.setDate(1);
    setFirstDayOfWeek(date.getDay());
    setFirstDayOfWeekArr([]);
    for (let i = 1; i <= firstDayOfWeek; i += 1) {
      setFirstDayOfWeekArr((prevState) => {
        return [...prevState, i];
      });
      if (i === 7) {
        setFirstDayOfWeekArr([]);
      }
    }
    date.setMonth(date.getMonth() + 1);
    date.setDate(-1);
    setLastDay(date.getDate() + 1);
    setDays([]);
    for (let i = 1; i <= lastDay; i += 1) {
      setDays((prevState) => {
        return [...prevState, i];
      });
    }
    setYear(date.getFullYear());
  }, [lastDay, date]);

  const selectDate = (e) => {
    const selectedDate = parseInt(e.target.innerText);
    if (!firstSelectedDate && checkDateRange(selectedDate)) {
      setFirstSelectedDate(selectedDate);
    } else if (
      +e.target.innerText > firstSelectedDate &&
      checkDateRange(selectedDate)
    ) {
      setLastSelectedDate(selectedDate);
    }
  };

  const checkDateRange = (selectedDate) => {
    for (let i = parseInt(firstSelectedDate); i < selectedDate; i += 1) {
      if (bookedDates.includes(i)) {
        return false;
      }
    }
    if (
      !checkForPastDate(selectedDate) ||
      bookedDates.includes(selectedDate) ||
      (bookedDates.includes(selectedDate + 1) && !firstSelectedDate)
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    let tempCheckIn;
    let tempCheckOut;
    let tempMonth = month.toString();
    if (tempMonth.length === 1) {
      tempMonth = "0" + (month + 1);
    } else {
      tempMonth = month + 1;
    }
    if (firstSelectedDate < 10) {
      tempCheckIn = "0" + firstSelectedDate;
    } else {
      tempCheckIn = firstSelectedDate;
    }
    if (lastSelectedDate < 10) {
      tempCheckOut = "0" + lastSelectedDate;
    } else {
      tempCheckOut = lastSelectedDate;
    }
    tempCheckIn = `${year}-${tempMonth}-${tempCheckIn}`;
    tempCheckOut = `${year}-${tempMonth}-${tempCheckOut}`;

    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckIn)) {
      setCheckInDate(tempCheckIn);
    }
    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckOut)) {
      setCheckOutDate(tempCheckOut);
      setErrors(false);
    }
    let bookedDates = [];
    bookedDatesArr
      .filter((dateRange) => {
        return dateRange[0].month === month || dateRange[1].month === month;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });
    setBookedDates(bookedDates);
  }, [firstSelectedDate, lastSelectedDate, month, year]);

  useEffect(() => {
    if (checkOutDate) {
      setLastSelectedDate(checkOutDate.slice(8, 10));
    }
    if (checkInDate) {
      setFirstSelectedDate(checkInDate.slice(8, 10));
    }
  }, [checkOutDate, checkInDate]);

  const nextMonth = () => {
    date.setDate(1);
    setMonth((prevState) => prevState + 1);
    date.setMonth(month + 1);
    setMonthName(date.toLocaleString("default", { month: "long" }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  const prevMonth = () => {
    date.setDate(1);
    setMonth((prevState) => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString("default", { month: "long" }));
    setMonth(date.getMonth());
    setLastDay(0);
    clearCalendar();
  };

  const clearCalendar = () => {
    setFirstSelectedDate(null);
    setLastSelectedDate(null);
    setCheckInDate("");
    setCheckOutDate("");
  };

  const checkForPastDate = (day) => {
    const today = new Date();

    if (date.getFullYear() > today.getFullYear()) {
      return true;
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() > today.getMonth()
    ) {
      return true;
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day >= today.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const calendarDays = () => {
    let bookedDates = [];
    bookedDatesArr
      .filter((dateRange) => {
        return dateRange[0].month === month || dateRange[1].month === month;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });

    return days.map((day) => {
      let element;
      if (day > firstSelectedDate && day < lastSelectedDate) {
        element = (
          <div className="active-backing">
            <div
              key={day}
              className="active-date clickable-date"
              onClick={selectDate}
            >
              {day}
            </div>
          </div>
        );
      } else if (day === +firstSelectedDate) {
        element = (
          <div className="first-backing">
            <div key={day} className="first-date" onClick={selectDate}>
              {day}
            </div>
          </div>
        );
      } else if (day === +lastSelectedDate) {
        element = (
          <div className="last-backing">
            <div key={day} className="last-date" onClick={selectDate}>
              {day}
            </div>
          </div>
        );
      } else if (bookedDates.includes(day)) {
        element = (
          <div key={day} className="booked-date">
            {day}
          </div>
        );
      } else if (bookedDates.includes(day + 1) && !firstSelectedDate) {
        element = (
          <div key={day} className="checkout-only-date">
            {day}
          </div>
        );
      } else if (checkForPastDate(day)) {
        element = (
          <div
            key={day}
            onClick={selectDate}
            className={
              !firstSelectedDate || day > firstSelectedDate
                ? "clickable-date"
                : "date"
            }
          >
            {day}
          </div>
        );
      } else {
        element = (
          <div key={day} onClick={selectDate} className="expired-date">
            {day}
          </div>
        );
      }
      return element;
    });
  };

  return (
    <div className="calendar">
      <div className="month">
        <div className="month-header">
          <span className="prev" onClick={prevMonth}>
            {"<"}
          </span>
          <span className="next" onClick={nextMonth}>
            {">"}
          </span>
          <div>
            <span>
              {monthName} {year}
            </span>
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
        {firstDayOfWeekArr.map((day) => {
          return <div key={day}></div>;
        })}
        {calendarDays()}
      </div>
      <div onClick={clearCalendar} className="clickable-date-clear">
        CLEAR CALENDAR
      </div>
    </div>
  );
}

export default Calendar;
