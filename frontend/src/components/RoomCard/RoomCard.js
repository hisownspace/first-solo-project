import { useHistory } from 'react-router-dom';

function RoomCard({ room }) {
  const history = useHistory();

  return (
  <div className='room-card' onClick={() => history.push(`/rooms/${room.id}`)}>
    <img alt={room.description} src={room.imageUrl}></img>
    <p>{room.title}</p>
    <p>{room.description}</p>
  </div>)
};

export default RoomCard;