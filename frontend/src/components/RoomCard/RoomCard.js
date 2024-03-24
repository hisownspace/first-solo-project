import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

function RoomCard({ room }) {
  const history = useHistory();

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    // put thunktion here
  };

  return (
    <div
      className="room-card"
      onClick={() => history.push(`/rooms/${room.id}`)}
    >
      <div className="card-image">
        <img alt={room.description} src={room.imageUrl}></img>
        {false ? (
          <FontAwesomeIcon
            onClick={toggleFavorite}
            className="favorite-icon"
            icon={faHeart}
          />
        ) : (
          <FontAwesomeIcon
            className="favorite-icon-selected"
            icon={faHeartSolid}
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
