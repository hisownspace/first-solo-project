import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push(`/`);
  };

  return (
    <div className='user-settings'>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-users-cog fa-2x"></i>
      </button>
      <button className='add-room-button'><NavLink exact to="/rooms/make">Try Hosting</NavLink></button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className='profile-username'>{user.username}</li>
          <li className='profile-email'>{user.email}</li>
          <li>
            <button className='profile-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;