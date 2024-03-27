import { csrfFetch } from "./csrf";

const GET_AMENITIES = "amenity/GET";

export const getAmenities = (amenities) => {
  return {
    type: GET_AMENITIES,
    amenities,
  };
};

export const amenitiesRetrieved = () => async (dispatch) => {
  const res = await fetch(`/api/amenities`);
  const amenities = await res.json();
  console.log(amenities);
  dispatch(getAmenities(amenities));
};

const initialState = [];

export default function amenityReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_AMENITIES:
      newState = action.amenities;
      return newState;
    default:
      return state;
  }
}
