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
  const [amenities, setAmenities] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState(false);
  const ownerId = sessionUser?.id;

  useEffect(() => {
    // dispatch(roomActions.readRoom(+roomId));
    setAmenities(room.amenities);
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

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl && city && country && address) {
      setErrors([]);
      const room = await dispatch(roomActions.updateRoom({
        imageUrl,
        amenities,
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

  return (
    <form className='add-room' onSubmit={handleSubmit}>
      <h2>Make New Listing</h2>
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
      <p className='error'></p> 
      <label>
        {"Zip: "}
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </label>
      <p className='error'></p> 
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
      <label>
        {"Amenities: "}
        <input
          type="text"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
      </label>
      <button type="submit">Edit Listing</button>
    </form>
  );
}

export default MakeNewListing;