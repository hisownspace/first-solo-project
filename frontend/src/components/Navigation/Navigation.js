import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import CalendarModal from "../CalendarModal";
import { searchRooms } from "../../store/room";
import logo from "../../roomshare_plus_logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const searchInput = useRef(null);
  const verticalLine = useRef(null);
  const dateButton = useRef(null);
  const header = useRef(null);
  const checkIn = useRef(null);
  const checkOut = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const searchForRoom = async (e) => {
    e.preventDefault();
    // if (searchValue) {
      setSearchValue("");
      searchInput.current.blur();
      if (showModal) {
        toggleCalendarModal(e);
      }
      console.log("searching for room")
      const rooms = await dispatch(searchRooms({ searchValue, checkInDate, checkOutDate }));
      console.log(rooms);
      // return history.push(`/rooms/search/${searchValue}`);
    // }
  };

  const toggleCalendarModal = (e) => {
    setShowModal((state) => !state);
    if (!header.current.classList.contains("header-expanded")) {
      header.current.classList.add("header-expanded");
      searchInput.current.classList.add("search-input-expanded");
      dateButton.current.classList.add("date-button-expanded");
      verticalLine.current.classList.add("vertical-line-expanded");
    } else {
      header.current.classList.remove("header-expanded");
      searchInput.current.classList.remove("search-input-expanded");
      searchInput.current.id = "";
      dateButton.current.classList.remove("date-button-expanded");
      verticalLine.current.classList.remove("vertical-line-expanded");
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div>
        RoomsList
        <LoginFormModal />
        <button>
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
      </div>
    );
  }

  return (
    <div ref={header} className="header">
      <NavLink exact to="/">
        <img className="site-logo" alt="roomshare logo" src={logo}></img>
      </NavLink>
      <div className="header-mid">
        {showModal ? (
          <div
            ref={dateButton}
            className="date-button"
            onClick={toggleCalendarModal}
          >
            <div ref={checkIn} className="active-expanded">
              <p>Check In Date</p>
              <p>{checkInDate}</p>
            </div>
            <div ref={checkOut} className="inactive-expanded">
              <p>Check Out Date</p>
              <p>{checkOutDate}</p>
            </div>
          </div>
        ) : (
          <div
            ref={dateButton}
            className="date-button"
            onClick={toggleCalendarModal}
          >
            Pick Dates
          </div>
        )}
        <div className="vertical-line" ref={verticalLine} />
        <form onSubmit={searchForRoom}>
          <input
            className="search-input"
            type="text"
            value={searchValue}
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => {
              searchInput.current.classList.add("search-input-focused");
              searchInput.current.placeholder = "";
              verticalLine.current.style.display = "none";
              e.target.select();
            }}
            required={false}
            onBlur={() => {
              searchInput.current.classList.remove("search-input-focused");
              verticalLine.current.style.display = "inline-block";
              searchInput.current.placeholder = "Search";
            }}
            ref={searchInput}
          />
        </form>
      </div>
      <CalendarModal
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        showModal={showModal}
        setShowModal={setShowModal}
        searchInput={searchInput}
        verticalLine={verticalLine}
        dateButton={dateButton}
        header={header}
        toggleCalendarModal={toggleCalendarModal}
        checkIn={checkIn}
        checkOut={checkOut}
        searchForRoom={searchForRoom}
      />
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
