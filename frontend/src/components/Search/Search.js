import { useEffect, useState } from 'react';
import  { useDispatch, useSelector } from  'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import RoomCard from '../RoomCard';
import * as roomActions from "../../store/room";

function RoomSearch() {
  const dispatch = useDispatch();
  const { string } = useParams();
  const history = useHistory();
  
  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);


  useEffect(() => {
    (async () => {
      const rooms = await dispatch(roomActions.searchRooms(string));
      console.log(rooms);
      console.log(!rooms.length)
      if (!rooms.length) history.push('/');
    })();
  }, [dispatch, string, history]);

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