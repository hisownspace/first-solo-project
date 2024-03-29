// import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Calendar from "../Calendar/Calendar";

function CalendarModal({ showModal, setShowModal }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Calendar
            bookedDatesArr={[]}
            setCheckInDate={() => {}}
            setCheckOutDate={() => {}}
          />
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
