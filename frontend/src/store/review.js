import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'review/get';
const ADD_REVIEW = 'review/add';
const EDIT_REVIEW = 'review/edit'
const REMOVE_REVIEW = 'review/remove';


export const removeReview = review => {
  return {
    type: REMOVE_REVIEW,
    review
  }
};

export const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

export const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  }
};

export const editReview = review => {
  return {
    type: EDIT_REVIEW,
    review
  }
};

export const readReviews = roomId => async dispatch => {
  const response = await csrfFetch(`/api/rooms/${roomId}/rentals`);
  const rentals = await response.json();
  return dispatch(getReviews(rentals))
};

export const createReview = review => async dispatch => {
  const {
    userId,
    rating,
    content
  } = review;
  const response = await csrfFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      rating,
      content
    })
  });
  await response.json();
  return dispatch(addReview(review));
};

export const deleteReview = (reviewId, userId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ userId })
  });
  await response.json();
  return dispatch(removeReview(reviewId));
};

const initialrental = { roomReviews: [], myReviews: [] };

export default function rentalReducer(state = initialrental, action) {
  let newState;
  switch (action.type) {
    case REMOVE_REVIEW:
      newState = { ...state }
      delete newState[action.reviewId];
      return newState;
    case ADD_REVIEW:
      newState = { ...state }
      newState.myReviews[action.review.id] = action.review;
      return newState;
    case GET_REVIEWS:
      newState = { ...state };
      newState.roomReviews = action.rentals;
      return newState;
    case EDIT_REVIEW:
      newState = { ...state };
      newState.myReviews[action.review.id] = action.review;
      return newState;
    default:
      return state;
  }
}