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
  let [ownerButtons, setOwnerButtons] = useState();
  let [renterOptions, setRenterOptions] = useState();
  
  useEffect(() => {
    dispatch(roomActions.readRoom(+roomId));
  }, [dispatch, roomId]);
  
  useEffect(() => {
    if (room?.amenities) {setAmenities(room.amenities.split(', '))};
    console.log(sessionUser?.id)
    console.log(room?.ownerId)
    if (sessionUser?.id === room?.ownerId) {
      setOwnerButtons(
      <>
        <button onClick={removeListing}>Remove Listing</button>
        <button onClick={editListing}>Edit Listing</button>
      </>);
    } else {
      setRenterOptions(
      <>
        <button onClick={makeReservation}>Make Reservation</button>
      </>);
    }
    console.log(ownerButtons)
  }, [room]);

  useEffect(() => {
  }, [room]);

  function removeListing() {
    const confirm = window.confirm('Are you sure you want to remove this listing?')
    if (confirm) {
      console.log('hello there!')
      dispatch(roomActions.deleteRoom(+roomId));
      history.push(`/`);
      return room;
    }
  };

  function editListing() {
      return;
  };

  function makeReservation() {
    return;
  }
  
  if (!sessionUser || !room) return <Redirect to="/" />;
  
  return (
    <>
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
      {amenities && amenities.map((amenity, index) => <li key={index + 1}>{amenity}</li>)}
      <li>
        {ownerButtons ? ownerButtons : renterOptions}
      </li>
      </ul>
      
    </>
  )
}

export default RoomDetail;