import { useHistory } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { favoriteRoom } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { generatePresignedUrl } from "../../utils/aws_helpers";

function RoomCard({ room }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const carouselRef = useRef(new Array(5));
  const favorites = useSelector((state) => state.session.user.favorites);
  const userId = useSelector((state) => state.session.user.id);
  const [imageUrl, setImageUrl] = useState("");
  const [distance, setDistance] = useState("");
  const [imageNumber, setImageNumber] = useState(0);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    // put thunktion here
    dispatch(favoriteRoom(room.id, userId));
  };

  useEffect(() => {
    if (room.RoomImages) {
      setImageUrl(room?.RoomImages[imageNumber]?.imageUrl);
    }
    const nextImages = carouselRef.current;
    for (let image of nextImages) {
      image.style.transform = `translateX(-${imageNumber}00%)`;
    }
  }, [room, imageNumber]);
    
  const showCarouselBtns = (e) => {
    e.stopPropagation();
    const nextBtn = e.currentTarget.querySelector(".carousel-next");
    const prevBtn = e.currentTarget.querySelector(".carousel-prev");
    if (nextBtn) {
      nextBtn.style.display = "inline"
    }
    if (prevBtn) {
      prevBtn.style.display = "inline"
    }
  }

  const hideCarouselBtns = (e) => {
    e.stopPropagation();
    const nextBtn = e.currentTarget.querySelector(".carousel-next");
    const prevBtn = e.currentTarget.querySelector(".carousel-prev");
    if (nextBtn) {
      nextBtn.style.display = "none"
    }
    if (prevBtn) {
      prevBtn.style.display = "none"
    }
  }

  const cycleNextImage = e => {
    e.stopPropagation();
    setImageNumber(state => state + 1);
    console.log(imageNumber)
  }

  const cyclePrevImage = e => {
    e.stopPropagation();
    setImageNumber(state => state - 1);
    console.log(imageNumber)
  }

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
      <div onMouseOver={showCarouselBtns} onMouseLeave={hideCarouselBtns} className="card-image-container">
        <img alt={room.description} ref={el => carouselRef.current[0] = el} className="card-image next" src={room.RoomImages[room.RoomImages.length-1].imageUrl} />
        <img alt={room.description} ref={el => carouselRef.current[1] = el} className="card-image next next-1" src={room.RoomImages[room.RoomImages.length-2]?.imageUrl} />
        <img alt={room.description} ref={el => carouselRef.current[2] = el} className="card-image next next-2" src={room.RoomImages[room.RoomImages.length-3]?.imageUrl} />
        <img alt={room.description} ref={el => carouselRef.current[3] = el} className="card-image next next-3" src={room.RoomImages[room.RoomImages.length-4]?.imageUrl} />
        <img alt={room.description} ref={el => carouselRef.current[4] = el} className="card-image next next-4" src={room.RoomImages[room.RoomImages.length-5]?.imageUrl} />
        {imageNumber < room.RoomImages.length-1 ? <div onClick={cycleNextImage} className="carousel-next">{">"}</div>: null}
        {imageNumber > 0 ? <div onClick={cyclePrevImage} className="carousel-prev">{"<"}</div>: null}
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
