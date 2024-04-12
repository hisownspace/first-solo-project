import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as sessionActions from "../../store/session";

function MakeNewListing() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const room = useSelector((state) => state.room.currentRoom);
  const amenitiesStore = useSelector(state => state.amenity.amenities)
  const roomAmenities = useSelector(state => state.amenity.roomAmenities);
  const [amenities, setAmenities] = useState([]);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState(false);
  const ownerId = sessionUser?.id;

  useEffect(() => {
    // dispatch(roomActions.readRoom(+roomId));
    setAmenities(amenitiesStore);
    setCity(room.city);
    setZip(room.zip);
    setState(room.state);
    setCountry(room.country);
    setAddress(room.address);
    setImageUrl(room.imageUrl);
    setTitle(room.title);
    setDescription(room.description);
    setId(room.id);
  }, []);

  useEffect(() => {
    const tempAmenities = new Array(amenitiesStore.length);
    for (let i = 0; i < roomAmenities.length; i++) {
      tempAmenities[roomAmenities[i].amenityId - 1] = true;
    }
    setCheckedState(tempAmenities);
  }, [roomAmenities])

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl && city && country && address && title && description && zip && state) {
      const roomAmenities = [];
    for (let i = 0; i < amenities.length; i++) {
      if (checkedState[i]) {
        roomAmenities.push(amenities[i].id);
      }
    }
      setErrors([]);
      console.log("room amenities: ", roomAmenities);
      const room = await dispatch(roomActions.updateRoom({
        imageUrl,
        roomAmenities,
        city,
        state,
        zip,
        country,
        address,
        title,
        description,
        id
      }, ownerId));
      history.push(`/rooms/${id}`);
      return room;
    }
    return setErrors(true);
  };

  const handleCheckedState = (e, idx) => {
    const tempCheckedState = [...checkedState];
    tempCheckedState[idx] = !tempCheckedState[idx];
    setCheckedState(tempCheckedState);
  };

  return (
    <form className='add-room' onSubmit={handleSubmit}>
      <h2>Edit Listing</h2>
      {/* <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul> */}
      <label>
        {'Title: '}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // required
          />
      </label>
      {title || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {'Description: '}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          // required
        />
      </label>
      {description || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {'Address: '}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          // required
        />
      </label>
      {address || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {"City: "}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // required
        />
      </label>
      {city || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {"State: "}
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      {state || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {"Zip: "}
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </label>
      {zip || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {"Country: "}
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          // required
        />
      </label>
      {country || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <label>
        {"Photo: "}
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          // required
        />
      </label>
      {imageUrl || !errors ? <p className='error'></p> : <p className='error'>Required Field</p>}
      <ul className="amenities-list">
        {amenities.map((amenity, idx) => {
        return (
        <li
            key={`amenities-checkbox-div-${amenity.id}`}
            className={"checkbox-div"}
          >
            <label
              className="checkbox-label"
              htmlFor={`amenity-checkbox-${amenity.id}`}
              >
              {amenity.name}
            </label>
            <input
            className="checkbox-input"
            type="checkbox"
            id={`amenity-checkbox-${amenity.id}`}
            name={amenity.name}
            value={amenity.id}
            checked={checkedState[idx] === undefined ? false : checkedState[idx]}
            onChange={e => handleCheckedState(e, idx)}
            />
          </li>
        )
      })}
      </ul>
      <button type="submit">Edit Listing</button>
    </form>
  );
}

export default MakeNewListing;
