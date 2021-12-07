import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as sessionActions from "../../store/session";

function MakeNewListing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [amenities, setAmenities] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const ownerId = sessionUser.id;

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl && city && country && address) {
      setErrors([]);
      const room = await dispatch(roomActions.createRoom({ ownerId, amenities, city, state, country, address, zip, imageUrl }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          return data;
        });
        history.push(`/rooms/${room.id}`);
    }
    return setErrors(['Please fill out the required fields']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className={address ? 'completed-input' : 'empty-input'}>
        {address ? "address: " : "Required Field: address"}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        {"City: "}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        {"State: "}
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <label>
        {"Zip: "}
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </label>
      <label>
        {"Country: "}
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        {"Photo: "}
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label>
        {"Amenities: "}
        <input
          type="text"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default MakeNewListing;