import { useEffect, useState } from 'react';
import  { useDispatch, useSelector } from  'react-redux';

import RoomCard from '../RoomCard';
import * as roomActions from "../../store/room";

function RoomsList() {
  const dispatch = useDispatch();
  
  const roomStore = useSelector((state) => state.room.roomsList);


  useEffect(() => {
    dispatch(roomActions.readRooms());
  }, []);

  return (
    <div className='rooms-list'>
      <h2>Rooms!</h2>
      <ul>
      {roomStore.map((room, index) => {
        return roomStore ? <li key={index}><RoomCard room={room} /></li> : null
      })}
      </ul>
    </div>
  );
};

export default RoomsList;