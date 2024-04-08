import { useEffect, useState } from "react";

function Calendar({
  first,
  setCheckInDate,
  setCheckOutDate,
  setErrors,
  checkOutDate,
  checkInDate,
  bookedDatesArr,
  firstSelectedMonth,
  setFirstSelectedMonth,
  lastSelectedMonth,
  firstSelectedYear,
  lastSelectedYear,
  setFirstSelectedYear,
  setLastSelectedYear,
  setLastSelectedMonth,
  firstSelectedDate,
  setFirstSelectedDate,
  lastSelectedDate,
  setLastSelectedDate,
  syncForward,
  setSyncForward,
  syncBackward,
  setSyncBackward,
  tempLastSelectedDate,
  tempLastSelectedMonth,
  tempLastSelectedYear,
  setTempLastSelectedDate,
  setTempLastSelectedMonth,
  setTempLastSelectedYear,
  checkIn,
  checkOut,
  searchInput,
  searchForRoom,
  fromModal,
}) {
  const [date] = useState(
    new Date(
      new Date().getFullYear(),
      first ? new Date().getMonth() : new Date().getMonth() + 1,
      first ? new Date().getDate() : 1,
    ),
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    first ? new Date().getMonth() : new Date().getMonth() + 1,
  );
  const [monthName, setMonthName] = useState(
    date.toLocaleString("default", { month: "long" }),
  );
  const [days, setDays] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState();
  const [firstDayOfWeekArr, setFirstDayOfWeekArr] = useState([]);
  const [lastDay, setLastDay] = useState(0);
  const [bookedDates, setBookedDates] = useState("");

  useEffect(() => {
    // clearCalendar();
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
    clearCalendar();
  }, [lastDay, date, firstDayOfWeek]);

  const submitSearch = () => {
    console.log(checkInDate);
    console.log(checkOutDate);
    console.log(searchInput.current.value);
  }

  const clearTempDate = (e) => {
    setTempLastSelectedDate("");
    setTempLastSelectedMonth("");
    setTempLastSelectedYear("");
  };

  const selectTempDate = (e) => {
    if (firstSelectedDate === "" || lastSelectedDate !== "") {
      return;
    }
    const selectedDate = parseInt(e.target.innerText);
    if (checkDateRange(selectedDate)) {
      setTempLastSelectedMonth(month);
      setTempLastSelectedYear(year);
      setTempLastSelectedDate(selectedDate);
    }
  };

  const selectDate = (e) => {
    const selectedDate = parseInt(e.target.innerText);
    if (!firstSelectedDate && checkDateRange(selectedDate)) {
      setFirstSelectedDate(selectedDate);
      setFirstSelectedMonth(month);
      setFirstSelectedYear(year);
      if (fromModal) {
        checkIn.current.className = "inactive-expanded";
        checkOut.current.className = "active-expanded";
      }
    } else if (checkDateRange(selectedDate)) {
      console.log("TRUE!!!!!!!");
      setLastSelectedDate(selectedDate);
      setLastSelectedMonth(month);
      setLastSelectedYear(year);
      if (fromModal) {
        checkOut.current.className = "inactive-expanded";
        searchInput.current.id = "active-expanded";
        searchInput.current.focus();
      }
    }
    clearTempDate();
  };

  const checkDateRange = (selectedDate) => {
    const selectedDateObj = new Date(year, month, selectedDate);
    const firstSelectedDateObj = new Date(
      firstSelectedYear,
      firstSelectedMonth,
      firstSelectedDate,
    );
    for (let i = 0; i < bookedDates.length; i++) {
      const bookedDateObj = new Date(
        bookedDates[i].year,
        bookedDates[i].month,
        bookedDates[i].day,
      );
      if (
        selectedDateObj > bookedDateObj &&
        bookedDateObj > firstSelectedDateObj
      ) {
        console.log("FALSE!!!!!!!");
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
    let tempFirstMonth = firstSelectedMonth.toString();
    let tempLastMonth = lastSelectedMonth.toString();
    let tempFirstYear = firstSelectedYear;
    let tempLastYear = lastSelectedYear;
    if (tempFirstMonth.length === 1) {
      tempFirstMonth = "0" + (firstSelectedMonth + 1);
    } else {
      tempFirstMonth = firstSelectedMonth + 1;
    }
    if (tempLastMonth.length === 1) {
      tempLastMonth = "0" + (lastSelectedMonth + 1);
    } else {
      tempLastMonth = lastSelectedMonth + 1;
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
    tempCheckIn = `${tempFirstYear}-${tempFirstMonth}-${tempCheckIn}`;
    tempCheckOut = `${tempLastYear}-${tempLastMonth}-${tempCheckOut}`;

    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckIn)) {
      setCheckInDate(tempCheckIn);
    }
    if (/^[\d]{4}-[\d]{2}-[\d]{2}$/.test(tempCheckOut)) {
      setCheckOutDate(tempCheckOut);
      setErrors(false);
    }
    let bookedDates = [];
    bookedDatesArr.forEach((dateRange) => {
      let maxDays;
      if (dateRange[0].month === dateRange[1].month) {
        maxDays = dateRange[1].day;
        for (let i = dateRange[0].day; i <= maxDays; i += 1) {
          bookedDates.push({
            day: i,
            month: dateRange[0].month,
            year: dateRange[0].year,
          });
        }
      } else {
        maxDays = new Date(dateRange[1].year, dateRange[1].month, 0).getDate();
        for (let i = dateRange[0].day; i <= maxDays; i += 1) {
          bookedDates.push({
            day: i,
            month: dateRange[0].month,
            year: dateRange[0].year,
          });
        }
        for (let i = 1; i <= dateRange[1].day; i += 1) {
          bookedDates.push({
            day: i,
            month: dateRange[1].month,
            year: dateRange[1].year,
          });
        }
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
    // clearCalendar();
    if (!first) {
      setSyncForward(true);
    }
  };

  const prevMonth = () => {
    date.setDate(1);
    setMonth((prevState) => prevState - 1);
    date.setMonth(month - 1);
    setMonthName(date.toLocaleString("default", { month: "long" }));
    setMonth(date.getMonth());
    setLastDay(0);
    // clearCalendar();
    if (first) {
      setSyncBackward(true);
    }
  };

  useEffect(() => {
    if (syncForward && first) {
      setSyncForward(false);
      nextMonth();
    }
    if (syncBackward && !first) {
      setSyncBackward(false);
      prevMonth();
    }
  }, [syncForward, syncBackward]);

  const clearCalendar = () => {
    setFirstSelectedDate("");
    setLastSelectedDate("");
    setCheckInDate("");
    setCheckOutDate("");
    setFirstSelectedMonth(Infinity);
    setLastSelectedMonth(Infinity);
  };

  const checkForBookedDate = (day) => {
    for (let i = 0; i < bookedDates.length; i++) {
      if (bookedDates[i].day === day && bookedDates[i].month === month) {
        return true;
      }
    }
    return false;
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
    // let bookedDates = [];
    // bookedDatesArr
    //   .filter((dateRange) => {
    //     return dateRange[0].month === month || dateRange[1].month === month;
    //   })
    //   .forEach((dateRange) => {
    //     for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
    //       bookedDates.push(i);
    //     }
    //   });
    return days.map((day, idx) => {
      // console.log(idx);
      const inDate = new Date(
        firstSelectedYear,
        firstSelectedMonth,
        firstSelectedDate,
      );
      const outDate = new Date(
        lastSelectedYear,
        lastSelectedMonth,
        lastSelectedDate,
      );
      const tempOutDate = new Date(
        tempLastSelectedYear,
        tempLastSelectedMonth,
        tempLastSelectedDate,
      );
      const calendarDate = new Date(year, month, day);
      let element;
      if (
        inDate < calendarDate &&
        ((outDate > calendarDate &&
          firstSelectedMonth !== Infinity &&
          lastSelectedMonth !== Infinity) ||
          tempOutDate > calendarDate) &&
        idx === 0
      ) {
        element = (
          <div key={day} className="transition-first">
            <div></div>
            <div
              className="active-date clickable-date"
              onClick={selectDate}
              onMouseEnter={selectTempDate}
              onMouseLeave={clearTempDate}
            >
              {day}
            </div>
          </div>
        );
      } else if (
        inDate < calendarDate &&
        ((outDate > calendarDate &&
          firstSelectedMonth !== Infinity &&
          lastSelectedMonth !== Infinity) ||
          tempOutDate > calendarDate) &&
        idx === days.length - 1
      ) {
        element = (
          <div key={day} className="transition-last">
            <div
              className="active-date clickable-date"
              onMouseEnter={selectTempDate}
              onMouseLeave={clearTempDate}
              onClick={selectDate}
            >
              {day}
            </div>
          </div>
        );
      } else if (
        inDate < calendarDate &&
        ((outDate > calendarDate &&
          firstSelectedMonth !== Infinity &&
          lastSelectedMonth !== Infinity) ||
          tempOutDate > calendarDate)
      ) {
        element = (
          <div
            key={day}
            onMouseEnter={selectTempDate}
            className="active-backing"
          >
            <div
              className="active-date clickable-date"
              onMouseOut={clearTempDate}
              onClick={selectDate}
            >
              {day}
            </div>
          </div>
        );
      } else if (inDate.toString() === calendarDate.toString()) {
        {
          element =
            !isNaN(parseInt(lastSelectedDate)) || tempLastSelectedDate ? (
              <div key={day} className="first-backing">
                <div className="first-date">{day}</div>
              </div>
            ) : (
              <div onMouseLeave={clearTempDate} className="first-date">
                {day}
              </div>
            );
        }
      } else if (
        outDate.toString() === calendarDate.toString() ||
        tempOutDate.toString() === calendarDate.toString()
      ) {
        element = (
          <div key={day} className="last-backing">
            <div
              className={
                tempLastSelectedDate
                  ? "last-date temp-clickable-date"
                  : "last-date"
              }
              onMouseLeave={clearTempDate}
              onClick={selectDate}
            >
              {day}
            </div>
          </div>
        );
      } else if (checkForBookedDate(day)) {
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
            onClick={
              !firstSelectedDate || inDate < calendarDate ? selectDate : null
            }
            onMouseLeave={clearTempDate}
            onMouseEnter={
              !firstSelectedDate || inDate < calendarDate
                ? selectTempDate
                : null
            }
            className={
              !firstSelectedDate || inDate < calendarDate
                ? "clickable-date"
                : "date"
            }
          >
            {day}
          </div>
        );
      } else {
        element = (
          <div key={day} className="expired-date">
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
          {first ? (
            <span className="prev" onClick={prevMonth}>
              {"<"}
            </span>
          ) : (
            <span className="next" onClick={nextMonth}>
              {">"}
            </span>
          )}
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

      <div onMouseLeave={clearTempDate} className="days">
        {firstDayOfWeekArr.map((day) => {
          return <div key={day}></div>;
        })}
        {calendarDays()}
      </div>
      {first ? (
        <div onClick={clearCalendar} className="clickable-date-clear">
          CLEAR CALENDAR
        </div>
      ) : fromModal ? <div className="search-button-container"><button className="search-button" onClick={searchForRoom}>Search For Available Rooms</button></div> : null}
    </div>
  );
}

export default Calendar;
