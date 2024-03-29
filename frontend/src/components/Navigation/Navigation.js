import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import CalendarModal from "../CalendarModal";
import logo from "../../roomshare_plus_logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const searchInput = useRef(null);
  const verticalLine = useRef(null);
  const history = useHistory();

  const searchForRoom = (e) => {
    e.preventDefault();
    if (searchValue) {
      setSearchValue("");
      searchInput.current.blur();
      return history.push(`/rooms/search/${searchValue}`);
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
    <div className="header">
      <NavLink exact to="/">
        <img className="site-logo" alt="roomshare logo" src={logo}></img>
      </NavLink>
      <div className="header-mid">
        <div
          className="date-button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Pick Dates
        </div>
        <div className="vertical-line" ref={verticalLine} />
        <form onSubmit={searchForRoom}>
          <input
            className="search-input"
            type="text"
            value={searchValue}
            placeholder="     Search"
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              searchInput.current.className = "search-input-focused";
              searchInput.current.placeholder = "";
              verticalLine.current.style.display = "none";
            }}
            onBlur={() => {
              searchInput.current.className = "search-input";
              verticalLine.current.style.display = "inline-block";
              searchInput.current.placeholder = "     Search";
            }}
            ref={searchInput}
          />
        </form>
      </div>
      <CalendarModal showModal={showModal} setShowModal={setShowModal} />
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
