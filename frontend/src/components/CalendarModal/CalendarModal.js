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
}) {
  const [errors, setErrors] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
