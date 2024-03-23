import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import RoomCard from "../RoomCard";
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
    <div className="rooms-list">
      <ul className="room-card-list">
        {roomStore.map((room, index) => {
          return roomStore ? (
            <li className="room-card-list-item" key={index}>
              <RoomCard room={room} />
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default RoomsList;
