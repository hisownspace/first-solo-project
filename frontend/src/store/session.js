import { csrfFetch } from "./csrf";

const START_SESSION = 'session/start'
const END_SESSION = 'session/end'


export const setUser = session => {
  return {
    type: START_SESSION,
    session
  }
};

export const removeUser = () => {
  return {
    type: END_SESSION,
  }
};

export const login = user => async dispatch => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  })
  const session = await response.json();
  dispatch(setUser(session));
  return response;
};

const initialSession = { user: null };

export default function sessionReducer(state = initialSession, action) {
  let newState;
  switch (action.type) {
    case START_SESSION:
      newState = { ...state }
      newState.user = action.payload;
      return newState;
    case END_SESSION:
      newState = { ...state }
      newState.user = null;
      return newState;
    default:
      return state;
  }
}