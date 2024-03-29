import { Modal } from "../../context/Modal";
import Calendar from "../Calendar/Calendar";

function CalendarModal({ showModal, setShowModal }) {
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
