import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as SessionActions from '../../store/session';
import * as rentalActions from '../../store/rental';
import * as roomActions from '../../store/room';



function Reservations() {
  const sessionUser = useSelector((state) => state.session.user);
  const roomList = useSelector((state) => state.room.roomsList);
  let rentals  
  const ownerRentals = useSelector((state) => state.rental.myRentals.ownerRentals);
  const renterRentals = useSelector((state) => state.rental.myRentals.renterRentals);
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(rentalActions.readMyRentals(sessionUser.id));
    dispatch(roomActions.readRooms());
  }, []);

  const cancelReservation = async (rentalId) => {
    const confirm = window.confirm('Are you sure you want to cancel this reservation?')
    if (confirm) {
      let spark = await dispatch(rentalActions.deleteRental(+rentalId, sessionUser.id));
      console.log('spark', spark);
      setReload(!reload);
      return history.push('/rooms');
    }
  };
  
  return (
    <div>
    <h2>Your Reservations!</h2>
    <div className='owner-rentals'>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Location</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
          <th></th>
        </tr>
      </thead>
    {ownerRentals?.map(rental => {
              return (
      <tbody>
        <tr>
          <td>
              <img alt={roomList?.find(room => room.id === rental.roomId)?.title}
              src={roomList.find(room => room.id === rental.roomId)?.imageUrl}></img>
          </td>
          <td>
              {roomList?.find(room => room.id === rental.roomId)?.title}
          </td>
          <td>
            {`${new Date(rental.checkIn).toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}`}
          </td>
          <td>
            {`${new Date(rental.checkOut).toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}`}
          </td>
          <td>
            <button onClick={() => cancelReservation(rental.id)}>Cancel Reservation</button>
          </td>
        </tr>
      </tbody>)})}
    </table>
    </div>
    <div className='renter-rentals'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Location</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th></th>
          </tr>
        </thead>
      {renterRentals?.map(rental => {
                return (
        <tbody>
          <tr>
            <td>
                <img alt={roomList?.find(room => room.id === rental.roomId)?.title}
                src={roomList.find(room => room.id === rental.roomId)?.imageUrl}></img>
            </td>
            <td>
                {roomList?.find(room => room.id === rental.roomId)?.title}
            </td>
            <td>
              {`${new Date(rental.checkIn).toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}`}
            </td>
            <td>
              {`${new Date(rental.checkOut).toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}`}
            </td>
            <td>
            <button onClick={() =>cancelReservation(rental.id)}>Cancel Reservation</button>
            </td>
          </tr>
        </tbody>)})}
      </table>
    </div>
    </div>
  )
}


export default Reservations;