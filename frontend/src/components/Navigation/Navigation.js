import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../roomshare_plus_logo.png';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='session-links'>
        {/* <button className='add-room'><NavLink exact to="/rooms/make">Try Hosting</NavLink></button> */}
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
    <ul className='header'>
      <li>
      <NavLink exact to="/"><img alt='roomshare logo' src={logo}></img></NavLink>
      <NavLink exact to="/"><button>Home</button></NavLink>
      <NavLink exact to="/rooms"><button>Check Listings</button></NavLink>
      <NavLink exact to="/reservations"><button>Check Reservations</button></NavLink>
      {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;