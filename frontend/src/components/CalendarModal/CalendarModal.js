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
  return (
    <>
      {showModal && (
        <Modal onClose={toggleCalendarModal}>
          <div className="modal-calendar-container">
            <Calendar
              bookedDatesArr={[]}
              setCheckInDate={() => {}}
              setCheckOutDate={() => {}}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
