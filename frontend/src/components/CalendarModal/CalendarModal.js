import { useState } from "react";
import { Modal } from "../../context/Modal";
import Calendar from "../Calendar/Calendar";

function CalendarModal({
  showModal,
  setShowModal,
  header,
  searchInput,
  dateButton,
  verticalLine,
  toggleCalendarModal,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  checkIn,
  checkOut,
}) {
  const [errors, setErrors] = useState("");
  const [firstSelectedDate, setFirstSelectedDate] = useState("");
  const [firstSelectedMonth, setFirstSelectedMonth] = useState("");
  const [firstSelectedYear, setFirstSelectedYear] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");
  const [lastSelectedMonth, setLastSelectedMonth] = useState("");
  const [lastSelectedYear, setLastSelectedYear] = useState("");
  const [tempLastSelectedDate, setTempLastSelectedDate] = useState("");
  const [tempLastSelectedMonth, setTempLastSelectedMonth] = useState("");
  const [tempLastSelectedYear, setTempLastSelectedYear] = useState("");
  return (
    <>
      {showModal && (
        <Modal onClose={toggleCalendarModal}>
          <div className="modal-calendar-container">
            <Calendar
              first={true}
              bookedDatesArr={[]}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              setErrors={setErrors}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              firstSelectedDate={firstSelectedDate}
              setFirstSelectedDate={setFirstSelectedDate}
              firstSelectedMonth={firstSelectedMonth}
              setFirstSelectedMonth={setFirstSelectedMonth}
              firstSelectedYear={firstSelectedYear}
              setFirstSelectedYear={setFirstSelectedYear}
              lastSelectedDate={lastSelectedDate}
              setLastSelectedDate={setLastSelectedDate}
              lastSelectedMonth={lastSelectedMonth}
              setLastSelectedMonth={setLastSelectedMonth}
              lastSelectedYear={lastSelectedYear}
              setLastSelectedYear={setLastSelectedYear}
              tempLastSelectedDate={tempLastSelectedDate}
              tempLastSelectedMonth={tempLastSelectedMonth}
              tempLastSelectedYear={tempLastSelectedYear}
              setTempLastSelectedDate={setTempLastSelectedDate}
              setTempLastSelectedMonth={setTempLastSelectedMonth}
              setTempLastSelectedYear={setTempLastSelectedYear}
              checkIn={checkIn}
              checkOut={checkOut}
              searchInput={searchInput}
            />
            <Calendar
              first={false}
              bookedDatesArr={[]}
              setCheckInDate={() => {}}
              setCheckOutDate={() => {}}
              setErrors={setErrors}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              firstSelectedDate={firstSelectedDate}
              setFirstSelectedDate={setFirstSelectedDate}
              firstSelectedMonth={firstSelectedMonth}
              setFirstSelectedMonth={setFirstSelectedMonth}
              firstSelectedYear={firstSelectedYear}
              setFirstSelectedYear={setFirstSelectedYear}
              lastSelectedDate={lastSelectedDate}
              setLastSelectedDate={setLastSelectedDate}
              lastSelectedMonth={lastSelectedMonth}
              setLastSelectedMonth={setLastSelectedMonth}
              lastSelectedYear={lastSelectedYear}
              setLastSelectedYear={setLastSelectedYear}
              tempLastSelectedDate={tempLastSelectedDate}
              tempLastSelectedMonth={tempLastSelectedMonth}
              tempLastSelectedYear={tempLastSelectedYear}
              setTempLastSelectedDate={setTempLastSelectedDate}
              setTempLastSelectedMonth={setTempLastSelectedMonth}
              setTempLastSelectedYear={setTempLastSelectedYear}
              searchInput={searchInput}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
