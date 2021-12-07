import { csrfFetch } from "./csrf";

const GET_ROOM = 'room/get';
const ADD_ROOM = 'room/add';
const REMOVE_ROOM = 'room/remove';
const EDIT_ROOM = 'room/edit';

export const getRoom = room => {
  return {
    type: GET_ROOM,
    room
  }
}


export const removeRoom = roomId => {
  return {
    type: REMOVE_ROOM,
    roomId
  }
};

export const addRoom = room => {
  return {
    type: ADD_ROOM,
    room
  }
};

export const editRoom = room => {
  return {
    type: EDIT_ROOM,
    room
  }
};

export const readRoom = roomId => async dispatch => {
  console.log("I'm in... reading room ", `/api/rooms/${roomId}`)
  const response = await csrfFetch(`/api/rooms/${roomId}`);
  const room = await response.json();
  dispatch(getRoom(room))
  return room;
};

export const createRoom = room => async dispatch => {
  const { ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address } = room;
  const response = await csrfFetch('/api/rooms', {
    method: 'POST',
    body: JSON.stringify({
      ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address
    })
  });
  room = await response.json();
  dispatch(addRoom(room));
  return room;
};

export const deleteRoom = (roomId, userId) => async dispatch => {
  const response = await csrfFetch(`api/rooms/${roomId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId: window.store.getState().session.user.id })
  });
  dispatch(removeRoom(roomId));
};

export const updateRoom = (room, userId) => async dispatch => {
  const {
    imageUrl,
    amenities,
    city,
    state,
    zip,
    country,
    address,
    id } = room;
  const response = await csrfFetch(`api/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId: window.store.getState().session.user.id,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address  })
  });
  dispatch(editRoom(room));
};

const initialroom = { myRooms: {}, currentRoom: {}, roomsList: {} };

export default function roomReducer(state = initialroom, action) {
  let newState;
  switch (action.type) {
    case REMOVE_ROOM:
      newState = { ...state }
      delete newState[action.roomId];
      return newState;
    case ADD_ROOM:
      newState = { ...state }
      newState.myRooms[action.room.id] = action.room;
      return newState;
    case EDIT_ROOM:
      newState = { ...state }
      newState.myRooms[action.room.id] = action.room;
      return newState;
    case GET_ROOM:
      newState = { ...state }
      newState.currentRoom = action.room;
      return newState;
    default:
      return state;
  }
}