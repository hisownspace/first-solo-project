import React, {  useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from '../../roomshare_plus_logo.png';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [ searchValue, setSearchValue ] = useState('');
  const history = useHistory();

  const searchForRoom = e => {
    e.preventDefault();
    if (searchValue) {
      return history.push(`/rooms/search/${searchValue}`)
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='session-links'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>RoomsList
        <LoginFormModal />
        <button><NavLink to="/signup">Sign Up</NavLink></button>
      </div>
    );
  }

  return (
    <ul className='header'>
      <li>
      <NavLink exact to="/"><img alt='roomshare logo' src={logo}></img></NavLink>
      <div className='header-mid'>
        <form onSubmit={searchForRoom}>
          <input
          type='text'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          ></input>
          <button>Search</button>
        </form>
        {/* <NavLink exact to="/rooms"><button>Check Listings</button></NavLink> */}
        <NavLink exact to="/reservations"><button>Check Reservations</button></NavLink>
      </div>
      {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;