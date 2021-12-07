import { useEffect, useState } from 'react';
import  { useDispatch, useSelector } from  'react-redux';

import * as roomActions from "../../store/room";
import * as sessionActions from "../../store/session";

function RoomsList() {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.room.roomsList);
  
  
  useEffect(() => {
    // console.log('object')
    dispatch(roomActions.readRooms());
    console.log(rooms)
  });

  return (
    <div className='rooms-list'>
      <h2>Rooms!</h2>
      <ul>
      {rooms?.map((room, index) => {
        return <li key={index}>{room.id}</li>
      })}
      </ul>
    </div>
  );
};

export default RoomsList;