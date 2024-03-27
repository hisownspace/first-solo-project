import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import RoomCard from "../RoomCard";
import * as roomActions from "../../store/room";
import { favoritesRetrieved } from "../../store/session";
import { amenitiesRetrieved } from "../../store/amenity";

function RoomsList() {
  const dispatch = useDispatch();

  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);
  const amenitiesStore = useSelector((state) => state.amenity);

  useEffect(() => {
    if (sessionUser) {
      dispatch(favoritesRetrieved(sessionUser.id));
    }
    dispatch(roomActions.readRooms());
    dispatch(amenitiesRetrieved());
  }, [
    dispatch,
    sessionUser,
    favoritesRetrieved,
    roomActions,
    amenitiesRetrieved,
  ]);

  useEffect(() => {
    setAmenities(amenitiesStore);
    setRooms(roomStore);
  }, [roomStore, amenitiesStore]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="rooms-list">
      <ul className="amenity-list">
        {amenities.map((amenity) => {
          return (
            <li key={amenity.name} className="amenity">
              <img className="amenity-image" src={amenity.icon} />
              <div className="amenity-name">{amenity.name}</div>
            </li>
          );
        })}
      </ul>
      <ul className="room-card-list">
        {rooms.map((room, index) => {
          return rooms ? (
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
