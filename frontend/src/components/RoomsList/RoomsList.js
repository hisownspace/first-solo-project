import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation, useHistory } from "react-router-dom";

import RoomCard from "../RoomCard";
import * as roomActions from "../../store/room";
import { favoritesRetrieved } from "../../store/session";
import { amenitiesRetrieved } from "../../store/amenity";

function RoomsList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  // const { clear } = location.state.clear;

  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const roomStore = useSelector((state) => state.room.roomsList);
  const amenitiesStore = useSelector((state) => state.amenity.amenities);
  const search = useSelector(state => state.room.search);

  useEffect(() => {
    console.log(location);
    if (sessionUser) {
      dispatch(favoritesRetrieved(sessionUser.id));
    }
    if (!search) {
      dispatch(roomActions.readRooms());
    } else {
      // dispatch(roomActions.getRooms(roomStore));
    }
    if (location.state?.clear) {
      dispatch(roomActions.clearSearch());
      location.state.clear = false;
    }
    dispatch(amenitiesRetrieved());
  }, [
    dispatch,
    sessionUser,
    favoritesRetrieved,
    roomActions,
    amenitiesRetrieved,
    search
  ]);

  useEffect(() => {
    setAmenities(amenitiesStore);
    setRooms(roomStore);
  }, [amenitiesStore, roomStore]);


  useEffect(() => {
    return () => {
      if (!search) {
        dispatch(roomActions.clearRooms());
      }
    }
  }, [])

  const amenitySearch = async id => {
    const rooms = await dispatch(roomActions.searchRooms({searchValue: id, checkOutDate: null, checkInDate: null}));
    // return history.push(`/`);
  }

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="rooms-list">
      <ul className="amenity-list">
        {amenities.map((amenity) => {
          return (
            <li onClick={e => amenitySearch(amenity.id)}key={amenity.name} className="amenity">
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
