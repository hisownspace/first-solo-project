import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as sessionActions from "../../store/session";

function MakeNewListing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const amenitiesStore = useSelector((state) => state.amenity.amenities);
  const [amenities, setAmenities] = useState([]);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(false);
  const ownerId = sessionUser?.id;

  useEffect(() => {
    setAmenities(amenitiesStore);
  }, []);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      image &&
      city &&
      country &&
      address &&
      title &&
      description &&
      zip &&
      state
    ) {
      const roomAmenities = [];
      for (let i = 0; i < amenities.length; i++) {
        if (checkedState[i]) {
          roomAmenities.push(amenities[i].id);
        }
      }
      setErrors([]);
      const formData = new FormData();

      formData.append("ownerId", ownerId);
      formData.append("roomAmenities", roomAmenities);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("address", address);
      formData.append("zip", zip);
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);

      const room = await dispatch(roomActions.createRoom(formData));
      history.push(`/rooms/${room.id}`);
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
    // <div className="add-room-container">
    <form
      encType="multipart/form-data"
      className="add-room"
      onSubmit={handleSubmit}
    >
      <h2>Make New Listing</h2>
      {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
      <label>
        {"Title: "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // required
        />
      </label>
      {title || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"Description: "}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          // required
        />
      </label>
      {description || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"Address: "}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          // required
        />
      </label>
      {address || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"City: "}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // required
        />
      </label>
      {city || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"State: "}
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      {state || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"Zip: "}
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </label>
      {zip || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"Country: "}
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          // required
        />
      </label>
      {country || !errors ? (
        <p className="error"></p>
      ) : (
        <p className="error">Required Field</p>
      )}
      <label>
        {"Photo: "}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          // required
        />
      </label>
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
                checked={
                  checkedState[idx] === undefined ? false : checkedState[idx]
                }
                onChange={(e) => handleCheckedState(e, idx)}
              />
            </li>
          );
        })}
      </ul>
      <button type="submit">Create Listing</button>
    </form>
    // </div>
  );
}

export default MakeNewListing;
