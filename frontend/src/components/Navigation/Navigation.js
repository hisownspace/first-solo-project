import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import logo from "../../roomshare_plus_logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const searchInput = useRef(null);

  const searchForRoom = (e) => {
    e.preventDefault();
    if (searchValue) {
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
        <form onSubmit={searchForRoom}>
          <input
            className="search-input"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              searchInput.current.className = "search-input-focused";
            }}
            onBlur={() => {
              searchInput.current.className = "search-input";
            }}
            ref={searchInput}
          ></input>
          <button>Search</button>
        </form>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
