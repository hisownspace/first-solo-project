import { useHistory } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader"
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
  const [distance, setDistance] = useState("");

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    // put thunktion here
    dispatch(favoriteRoom(room.id, userId));
  };

  useEffect(() => {
      if (room.RoomImages) {
      setImageUrl(room?.RoomImages[room.RoomImages.length-1].imageUrl);
    }
  }, [room.RoomImages]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: "weekly"
    })
    loader.load().then(async () => {
      const lng = parseFloat(localStorage.getItem("longitude"));
      const lat = parseFloat(localStorage.getItem("latitude"));

      const google = window.google;
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat, lng }],
          destinations: [`${room.address} ${room.city}, ${room.state} ${room.zip}`],
          travelMode: "DRIVING",
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        async (res, status) => {
          let drivingDistance;
          if (status !== "OK") {
            console.error(status);
          } else {
            drivingDistance = res.rows[0].elements[0].distance?.text
            if (drivingDistance){
              // the distance.text value in the res pojo is a string ending in " mi", so it is split to remove last three characters
              setDistance(drivingDistance.slice(0, drivingDistance.length-3));
            }
          }
          if (!drivingDistance) {
            const geocoder = new google.maps.Geocoder();

            const body = await geocoder.geocode({ address: room.city + ' ' + room.state, });
            // the body contains the latitude and longitude associated with address
            const  roomLng = body.results[0].geometry.location.lng()
            const  roomLat = body.results[0].geometry.location.lat()

            const { spherical } = await google.maps.importLibrary("geometry");

            const distInMeters = spherical.computeDistanceBetween(new google.maps.LatLng(lat, lng), new google.maps.LatLng(roomLat, roomLng));
            // 1609.34 meters in a mile
            // parseInt will convert float to int and
            // toLocaleString will format int with commas
            const distInMiles = parseInt(distInMeters / 1609.34).toLocaleString();
            setDistance(distInMiles);
          }
        }
      )

    })
  }, [room]);

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
      <p className="distance">
        {distance ? distance+" miles away" : null}
      </p>
      <p>
        <b>${room.cost}</b> night
      </p>
    </div>
  );
}

export default RoomCard;
