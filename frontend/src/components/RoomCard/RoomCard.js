import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { favoriteRoom } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { generatePresignedUrl } from "../../utils/aws_helpers";

function RoomCard({ room }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((state) => state.session.user.favorites);
  const userId = useSelector((state) => state.session.user.id);
  const [imageUrl, setImageUrl] = useState("");

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    // put thunktion here
    dispatch(favoriteRoom(room.id, userId));
  };

  useEffect(() => {
    (async () => {
      setImageUrl(room.RoomImages[room.RoomImages.length-1].imageUrl);
    })();
  }, [room.RoomImages]);

  return (
    <div
      className="room-card"
      onClick={() => history.push(`/rooms/${room.id}`)}
    >
      <div className="card-image">
        <img alt={room.description} src={imageUrl}></img>
        {favorites?.includes(room.id) ? (
          <FontAwesomeIcon
            onClick={toggleFavorite}
            className="favorite-icon-selected"
            icon={faHeartSolid}
          />
        ) : (
          <FontAwesomeIcon
            className="favorite-icon"
            icon={faHeart}
            onClick={toggleFavorite}
          />
        )}
      </div>
      <p style={{ fontWeight: "bold" }}>
        {room.city}, {room.state}
      </p>
      <p>
        <b>${room.cost}</b> night
      </p>
    </div>
  );
}

export default RoomCard;
