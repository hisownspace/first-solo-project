import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import * as SessionActions from '../../store/session';
import * as rentalActions from '../../store/rental';
import * as roomActions from '../../store/room';



function Reservations() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(rentalActions.readMyRentals(sessionUser.id));
    dispatch(roomActions.readRooms());
  }, [])

  
  return (
    <div>
    <h2>Your Reservations!</h2>

    <div className='owner-rentals'>

    </div>
    <div className='renter-rentals'>
    </div>
    </div>
  )
}


export default Reservations;