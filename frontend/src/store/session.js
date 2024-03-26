import { csrfFetch } from "./csrf";

const GET_SESSION = "session/start";
const END_SESSION = "session/end";
const FAVORITE_ROOM = "room/favorite";

export const setUser = (session) => {
  return {
    type: GET_SESSION,
    session,
  };
};

export const removeUser = () => {
  return {
    type: END_SESSION,
  };
};

const roomFavorited = (favorites) => {
  return {
    type: FAVORITE_ROOM,
    favorites,
  };
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password, firstName, lastName }),
  });
  const session = await response.json();
  dispatch(setUser(session.user));
  return response;
};

export const favoritesRetrieved = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/favorites`);
  const favorites = await res.json();
  if (userId) {
    dispatch(roomFavorited(favorites));
  }
};

export const favoriteRoom = (roomId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/rooms/${roomId}/favorite`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  const favorites = await response.json();
  dispatch(roomFavorited(favorites));
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });

  const session = await response.json();
  dispatch(setUser(session.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const session = await response.json();
  dispatch(setUser(session.user));
  return session;
};

const initialSession = { user: null };

export default function sessionReducer(state = initialSession, action) {
  let newState;
  switch (action.type) {
    case GET_SESSION:
      newState = { ...state };
      newState.user = action.session;
      return newState;
    case END_SESSION:
      newState = { ...state };
      newState.user = null;
      return newState;
    case FAVORITE_ROOM:
      newState = { ...state };
      if (newState.user) {
        newState.user.favorites = action.favorites;
      }
      return newState;
    default:
      return state;
  }
}
