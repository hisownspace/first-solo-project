import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import * as roomActions from "../../store/room";



function RoomDetail() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const history = useHistory();
  
  const room = useSelector((state) => state.room.currentRoom);
  const sessionUser = useSelector((state) => state.session.user);
  const [amenities, setAmenities] = useState([]);
  let [ownerButtons, setOwnerButtons] = useState('');
  let [renterOptions, setRenterOptions] = useState('');
  
  useEffect(() => {
    console.log('first sessionUser.id', sessionUser.id);
    console.log('first room.ownerId', room.ownerId);
    console.log('first room.address', room.address);
    dispatch(roomActions.readRoom(+roomId));
    // console.log(roomId);
  }, []);
  
  useEffect(() => {
    if (room.amenities) {setAmenities(room.amenities.split(', '))};
    if (sessionUser.id === room.ownerId) {
      console.log("set owner buttons");
      setOwnerButtons(
        <>
        <button onClick={removeListing}>Remove Listing</button>
        <button onClick={editListing}>Edit Listing</button>
      </>);
      setRenterOptions(null)
    } else {
      console.log("set renter options");
      setRenterOptions(
        <>
        <button onClick={makeReservation}>Make Reservation</button>
      </>);
      setOwnerButtons(null);
    }
    console.log('second sessionUser.id', sessionUser.id);
    console.log('second room.ownerId', room.ownerId);
    console.log('second room.address', room.address);
  }, [room]);

  function removeListing() {
    const confirm = window.confirm('Are you sure you want to remove this listing?')
    if (confirm) {
      console.log('hello there!')
      dispatch(roomActions.deleteRoom(+roomId));
      history.push(`/rooms`);
      return room;
    }
  };

  function editListing() {
    return history.push(`/rooms/${room.id}/edit`);
  };

  function makeReservation() {
    return;
  }
  
  if (!sessionUser || !room) return <Redirect to="/" />;
  
  return (
    <div className='room-detail'>
      <h2>Welcome to your Room</h2>
      <ul>
      <li>
        <img alt="" src={room.imageUrl}></img>
      </li>
      <li>
        {room.address}
      </li>
      <li>
        {room.city + ', '}
        {room.state + ' '}
        {room.zip}
      </li>
      <li>
        {room.country}
      </li>
      <li>Amenities:</li>
      {amenities && amenities.map((amenity, index) => <li key={index}>{amenity}</li>)}
      <li>
        {ownerButtons ? ownerButtons : renterOptions}
        {/* {renterOptions ? renterOptions : null} */}
      </li>
      </ul>
    </div>
  )
}

export default RoomDetail;