import { useSelector, useDispatch } from 'react-redux';

const Reviews = () => {
  const roomReviews = useSelector(state => state.reviews.roomReviews);
  const sessionUser = useSelector((state) => state.session.user);


  return (
    <div className="reviews">
      <ul>
        {Reviews.map(review => {
          return (
          <li key={review.id}>
            <header>
              <div>
                {review.userName}
              </div>
              <div>
                {review.rating}
              </div>
            </header>
            <content>
              {review.content}
            </content>
          </li>)
        })}
      </ul>
      {roomReviews.reduce((accum, currentVal) => {
        if (currentVal.userId === sessionUser.id) {
          return true;
        } else {
          return accum;
        }
      }, false) ? <button >Add Review</button> : null}
    </div>
  )
};

export default Reviews;