import { csrfFetch } from "./csrf";

const GET_AMENITIES = "amenity/GET";
const GET_ROOM_AMENITIES = "amenity/GET_ROOM"
const CLEAR_ROOM_AMENITIES = "amenity/CLEAR_ROOM_AMENITIES";

export const getRoomAmenities = amenities => {
  return {
    type: GET_ROOM_AMENITIES,
    amenities
  }
}

export const getAmenities = (amenities) => {
  return {
    type: GET_AMENITIES,
    amenities,
  };
};

export const roomAmenitiesCleared = (roomId) => {
  return  { type: CLEAR_ROOM_AMENITIES };
}

export const amenitiesRetrieved = () => async (dispatch) => {
  const res = await fetch(`/api/amenities`);
  const amenities = await res.json();
  console.log(amenities);
  dispatch(getAmenities(amenities));
};

export const roomAmenitiesRetrieved = (roomId) => async (dispatch) => {
  const res = await fetch(`/api/rooms/${roomId}/amenities`)
  const amenities = await res.json();
  console.log(amenities)
  dispatch(getRoomAmenities(amenities));
}

const initialState = { amenities: [], roomAmenities: [] };

export default function amenityReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_AMENITIES:
      newState = { ...state, amenities: [...action.amenities] }
      return newState;
    case GET_ROOM_AMENITIES:
      newState = { ...state, roomAmenities: [...action.amenities]}
      return newState;
    case CLEAR_ROOM_AMENITIES:
      newState = { ...state, roomAmenities: [] };
    default:
      return state;
  }
}
