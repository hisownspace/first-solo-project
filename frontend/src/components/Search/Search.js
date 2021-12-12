import { useEffect, useState } from 'react';
import  { useDispatch, useSelector } from  'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import RoomCard from '../RoomCard';
import * as roomActions from "../../store/room";

function RoomSearch() {
  const dispatch = useDispatch();
  const { string } = useParams();
  console.log(string);
  
  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);


  useEffect(() => {
      dispatch(roomActions.searchRooms(string));
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

export default RoomSearch;