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
  const [year1, setYear1] = useState(new Date().getFullYear());
  const [month1, setMonth1] = useState(new Date().getMonth());
  const [month1Name, setMonth1Name] = useState(
    new Date().toLocaleString("default", { month: "long" }),
  );
  const [days1, setDays1] = useState([]);
  const [emptyDaysArr1, setEmptyDaysArr1] = useState([]);

  const [firstSelectedDate, setFirstSelectedDate] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");
  const [bookedDates, setBookedDates] = useState("");

  useEffect(() => {
    clearCalendar();
    const firstDay = new Date(year1, month1).getDay();
    setEmptyDaysArr1([]);
    const emptyDaysArr1 = [];
    for (let i = 1; i <= firstDay; i += 1) {
      emptyDaysArr1.push(i);
    }
    setEmptyDaysArr1(emptyDaysArr1);
    const totalDays = [];
    const daysInMonth = new Date(year1, month1 + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      totalDays.push(i);
    }
    setDays1(totalDays);
  }, [month1, year1]);

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
    let tempMonth = month1.toString();
    if (tempMonth.length === 1) {
      tempMonth = "0" + (month1 + 1);
    } else {
      tempMonth = month1 + 1;
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
    tempCheckIn = `${year1}-${tempMonth}-${tempCheckIn}`;
    tempCheckOut = `${year1}-${tempMonth}-${tempCheckOut}`;

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
        return dateRange[0].month === month1 || dateRange[1].month === month1;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });
    setBookedDates(bookedDates);
  }, [firstSelectedDate, lastSelectedDate, month1, year1]);

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
    setMonth1((prevState) => prevState + 1);
    date.setMonth(month1 + 1);
    setMonth1Name(date.toLocaleString("default", { month: "long" }));
    setMonth1(date.getMonth());
    setYear1(date.getFullYear());
    clearCalendar();
  };

  const prevMonth = () => {
    date.setDate(1);
    setMonth1((prevState) => prevState - 1);
    date.setMonth(month1 - 1);
    setMonth1Name(date.toLocaleString("default", { month: "long" }));
    setMonth1(date.getMonth());
    setYear1(date.getFullYear());
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

    if (year1 > today.getFullYear()) {
      return true;
    } else if (year1 === today.getFullYear() && month1 > today.getMonth()) {
      return true;
    } else if (
      year1 === today.getFullYear() &&
      month1 === today.getMonth() &&
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
        return dateRange[0].month === month1 || dateRange[1].month === month1;
      })
      .forEach((dateRange) => {
        for (let i = dateRange[0].day; i <= dateRange[1].day; i += 1) {
          bookedDates.push(i);
        }
      });

    return days1.map((day) => {
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

  const Month = ({ first, next }) => {
    console.log(first);
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
                {month1Name} {year1}
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
          {emptyDaysArr1.map((day) => {
            return <div key={day}></div>;
          })}
          {calendarDays()}
        </div>
        <div onClick={clearCalendar} className="clickable-date-clear">
          CLEAR CALENDAR
        </div>
      </div>
    );
  };
  return (
    <>
      <Month first={true} />
      <Month first={false} />
    </>
  );
}

export default Calendar;
