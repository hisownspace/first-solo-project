import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <button><NavLink exact to="/rooms/make">Try Hosting</NavLink></button>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <button><NavLink to="/signup">Sign Up</NavLink></button>
      </div>
    );
  }

  return (
    <ul>
      <li>
      <button><NavLink exact to="/">Home</NavLink></button>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;