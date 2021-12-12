import { csrfFetch } from "./csrf";

const GET_RENTAL = 'rental/get';
const GET_ROOM_RENTALS = 'rental/getRoomRentals';
const GET_MY_RENTALS = 'rental/getMyRentals';
const ADD_RENTAL = 'rental/add';
const REMOVE_RENTAL = 'rental/remove';


export const getRental = rental => {
  return {
    type: GET_RENTAL,
    rental
  }
}

export const getRoomRentals = rentals => {
  return {
    type: GET_ROOM_RENTALS,
    rentals
  }
}

export const getMyRentals = rentals => {
  return {
    type: GET_MY_RENTALS,
    rentals
  }
}

export const removeRental = rentalId => {
  return {
    type: REMOVE_RENTAL,
    rentalId
  }
};

export const addRental = rental => {
  return {
    type: ADD_RENTAL,
    rental
  }
};

export const readRental = rentalId => async dispatch => {
  const response = await csrfFetch(`/api/rentals/${rentalId}`);
  const rental = await response.json();
  dispatch(getRental(rental))
  return rental;
};


export const readMyRentals = userId => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}/rentals`);
  const rentals = await response.json();
  dispatch(getMyRentals(rentals))
  return rentals;
};

export const readRoomRentals = roomId => async dispatch => {
  const response = await csrfFetch(`/api/rooms/${roomId}/rentals`);
  const rentals = await response.json();
  console.log(rentals);
  dispatch(getRoomRentals(rentals));
  console.log(rentals);
}

export const createRental = rental => async dispatch => {
  const { renterId,
    roomId,
    guests,
    checkIn,
    checkOut} = rental;
  const response = await csrfFetch('/api/rentals', {
    method: 'POST',
    body: JSON.stringify({
      renterId,
      roomId,
      guests,
      checkIn,
      checkOut
      })
  });
  rental = await response.json();
  dispatch(addRental(rental));
  return rental;
};

export const deleteRental = (rentalId, userId) => async dispatch => {
  console.log(rentalId, userId);
  const response = await csrfFetch(`/api/rentals/${rentalId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId })
  });
  const rentals = await response.json();
  dispatch(removeRental(rentalId));
  return rentals;
};

const initialrental = { myRentals: {}, currentRental: {}, roomRentals: [] };

export default function rentalReducer(state = initialrental, action) {
  let newState;
  switch (action.type) {
    case REMOVE_RENTAL:
      newState = { ...state }
      delete newState[action.rentalId];
      return newState;
    case ADD_RENTAL:
      newState = { ...state }
      newState.myRentals[action.rental.id] = action.rental;
      return newState;
    case GET_RENTAL:
      newState = { ...state }
      newState.currentRental = action.rental;
      return newState;
    case GET_ROOM_RENTALS:
      newState = { ...state };
      newState.roomRentals = action.rentals;
      return newState;
    case GET_MY_RENTALS:
      newState = { ...state };
      newState.myRentals = action.rentals;
      return newState;
    default:
      return state;
  }
}