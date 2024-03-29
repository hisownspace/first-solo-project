import { Modal } from "../../context/Modal";
import Calendar from "../Calendar/Calendar";

function CalendarModal({
  showModal,
  setShowModal,
  header,
  searchInput,
  dateButton,
  verticalLine,
}) {
  const closeModal = () => {
    setShowModal((state) => !state);
    if (!header.current.classList.contains("header-expanded")) {
      header.current.classList.add("header-expanded");
      searchInput.current.classList.add("search-input-expanded");
      dateButton.current.classList.add("date-button-expanded");
      verticalLine.current.classList.add("vertical-line-expanded");
    } else {
      header.current.classList.remove("header-expanded");
      searchInput.current.classList.remove("search-input-expanded");
      dateButton.current.classList.remove("date-button-expanded");
      verticalLine.current.classList.remove("vertical-line-expanded");
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
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
