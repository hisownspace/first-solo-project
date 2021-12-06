import { csrfFetch } from "./csrf";

const GET_ROOM = 'room/get';
const ADD_ROOM = 'room/add';
const REMOVE_ROOM = 'room/remove';
const EDIT_ROOM = 'room/edit';


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
  return response;
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

// export const login = user => async dispatch => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/room', {
//     method: 'POST',
//     body: JSON.stringify({ credential, password })
//   })
//   const room = await response.json();
//   dispatch(setUser(room.user));
//   return response;
// };

// export const logout = () => async dispatch => {
//     const response = await csrfFetch('/api/room', {
//     method: 'DELETE',
//   });
//   dispatch(removeUser());
//   return response;
// }

// export const restoreUser = () => async dispatch => {
//   const response = await csrfFetch('/api/room');
//   const room = await response.json();
//   dispatch(setUser(room.user));
//   return response;
// }

const initialroom = { myRooms: {} };

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
    default:
      return state;
  }
}