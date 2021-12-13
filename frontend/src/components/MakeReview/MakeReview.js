import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import reviewActions from '../../store/review';
import { useDispatch } from "react-redux";

const MakeReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  const room = useSelector(state => state.room.currentRoom)
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [errors, setErrors] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!review || !rating) {
      setErrors(true);
    } else {
      dispatch(reviewActions.createReview({userId: sessionUser, review, rating}));
      history.push(`/rooms/${room}/ `);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating
      </label>
      <select
        type='number'
        value={rating}
        onChange={e => setRating(e.target.value)}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <textarea
        value={review}
        onChange={e => setReview(e.target.value)}
      >
      </textarea>
      <button>Submit Review</button>
    </form>
  )
};

export default MakeReview;