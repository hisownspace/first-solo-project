import { useHistory } from "react-router-dom";

function RoomCard({ room }) {
  const history = useHistory();

  return (
    <div
      className="room-card"
      onClick={() => history.push(`/rooms/${room.id}`)}
    >
      <div className="card-image">
        <img alt={room.description} src={room.imageUrl}></img>
      </div>
      <p style={{ fontWeight: "bold" }}>
        {room.city}, {room.state}
      </p>
      {/* <p>{room.description}</p> */}
    </div>
  );
}

export default RoomCard;
