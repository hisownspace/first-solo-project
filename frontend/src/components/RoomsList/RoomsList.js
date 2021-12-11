import { useEffect, useState } from 'react';
import  { useDispatch, useSelector } from  'react-redux';
import { Redirect } from 'react-router-dom';

import RoomCard from '../RoomCard';
import * as roomActions from "../../store/room";

function RoomsList() {
  const dispatch = useDispatch();
  
  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);


  useEffect(() => {
    dispatch(roomActions.readRooms());
  }, []);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className='rooms-list'>
      <div className='cards'>
      {roomStore.map((room, index) => {
        return roomStore ? <li key={index}><RoomCard room={room} /></li> : null
      })}
      </div>
    </div>
  );
};

export default RoomsList;