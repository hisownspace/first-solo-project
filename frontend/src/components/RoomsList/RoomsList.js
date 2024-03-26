import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import RoomCard from "../RoomCard";
import * as roomActions from "../../store/room";
import { favoritesRetrieved } from "../../store/session";
import { amenitiesRetrieved } from "../../store/amenity";

function RoomsList() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);
  const amenitiesStore = useSelector((state) => state.amenity);

  useEffect(() => {
    dispatch(roomActions.readRooms());
    if (sessionUser) {
      dispatch(favoritesRetrieved(sessionUser.id));
    }
    dispatch(amenitiesRetrieved());
  }, [sessionUser]);

  useEffect(() => {
    console.log("HELLO");
    console.log(amenitiesStore);
  }, [amenitiesStore]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="rooms-list">
      <ul className="amenity-list">
        {amenitiesStore.map((amenity) => {
          return (
            <li className="amenity">
              <img className="amenity-image" src={amenity.icon} />
              <div className="amenity-name">{amenity.name}</div>
            </li>
          );
        })}
      </ul>
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
