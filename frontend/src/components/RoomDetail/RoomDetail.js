import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as sessionActions from "../../store/session";



function RoomDetail() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [currentRoom, setCurrentRoom] = useState({});
  const stateRoom = useSelector((state) => state.room.currentRoom);
  
  useEffect(() => {
    dispatch(roomActions.readRoom(+roomId));
    setCurrentRoom(stateRoom);
  }, [])

  return (
    <>
      <h2>Welcome to your Room</h2>
      <img alt="" src={currentRoom.imageUrl}></img>
    </>
  )
}

export default RoomDetail;