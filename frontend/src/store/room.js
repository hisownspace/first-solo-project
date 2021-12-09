import { csrfFetch } from "./csrf";

const GET_ROOM = 'room/get';
const GET_ROOMS = 'room/get-list';
const ADD_ROOM = 'room/add';
const REMOVE_ROOM = 'room/remove';
const EDIT_ROOM = 'room/edit';

export const getRoom = room => {
  return {
    type: GET_ROOM,
    room
  }
}

export const getRooms = rooms => {
  return {
    type: GET_ROOMS,
    rooms
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
  const response = await csrfFetch(`/api/rooms/${roomId}`);
  const room = await response.json();
  dispatch(getRoom(room))
  return room;
};


export const readRooms = () => async dispatch => {
  const response = await csrfFetch(`/api/rooms/`);
  const rooms = await response.json();
  dispatch(getRooms(rooms))
  return rooms;
};



export const createRoom = room => async dispatch => {
  const { ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      title,
      description } = room;
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
      address,
      title,
      description
    })
  });
  room = await response.json();
  dispatch(addRoom(room));
  return room;
};

export const deleteRoom = (roomId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/rooms/${roomId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId })
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
    title,
    description,
    id } = room;
  const response = await csrfFetch(`/api/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      title,
      description })
  });
  dispatch(editRoom(room));
};

const initialroom = { myRooms: {}, currentRoom: {}, roomsList: [] };

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
    case GET_ROOMS:
      newState = { ...state };
      newState.roomsList = action.rooms;
      return newState;
    default:
      return state;
  }
}