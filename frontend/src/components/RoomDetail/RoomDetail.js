import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as rentalActions from "../../store/rental";
import Calendar from "../Calendar/Calendar";
import { amenitiesRetrieved, roomAmenitiesRetrieved, roomAmenitiesCleared } from "../../store/amenity";

function RoomDetail() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const history = useHistory();
  const calendarRef = useRef(null);
  const amenitiesRef = useRef(null);
  const locationRef = useRef(null);
  const reviewsRef = useRef(null)

  const room = useSelector((state) => state.room.currentRoom);
  const sessionUser = useSelector((state) => state.session.user);
  const roomRentals = useSelector((state) => state.rental.roomRentals);
  const roomAmenities = useSelector(state => state.amenity.roomAmenities)
  const allAmenities = useSelector(state => state.amenity.amenities)
  const [errors, setErrors] = useState([]);
  const [amenities, setAmenities] = useState([]);
  let [ownerButtons, setOwnerButtons] = useState(null);

  const [checkInDate, setCheckInDate] = useState("Check In");
  const [checkOutDate, setCheckOutDate] = useState("Check Out");
  const [firstSelectedDate, setFirstSelectedDate] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");
  const [firstSelectedMonth, setFirstSelectedMonth] = useState(Infinity);
  const [lastSelectedMonth, setLastSelectedMonth] = useState(Infinity);
  const [firstSelectedYear, setFirstSelectedYear] = useState("");
  const [lastSelectedYear, setLastSelectedYear] = useState("");
  const [syncForward, setSyncForward] = useState(false);
  const [syncBackward, setSyncBackward] = useState(false);
  const [tempLastSelectedDate, setTempLastSelectedDate] = useState("");
  const [tempLastSelectedMonth, setTempLastSelectedMonth] = useState("");
  const [tempLastSelectedYear, setTempLastSelectedYear] = useState("");

  const [bookedDatesArr, setBookedDatesArr] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(roomAmenitiesRetrieved(+roomId));
    dispatch(roomActions.readRoom(+roomId)).then(() => setLoaded(true));
    dispatch(amenitiesRetrieved());
    dispatch(rentalActions.readRoomRentals(+roomId));

    return () => {
      dispatch(roomActions.clearRoom());
      dispatch(roomAmenitiesCleared(+roomId));
    }

  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomAmenities) {
      const tempAmenities = [];
      for (let i = 0; i < roomAmenities.length; i++) {
        tempAmenities.push(allAmenities.find(el => el.id == roomAmenities[i].amenityId)?.name);
      }
      setAmenities(tempAmenities);
    }
    if (sessionUser?.id === room.ownerId) {
      setOwnerButtons(
        <>
          <button onClick={removeListing}>Remove Listing</button>
          <button onClick={editListing}>Edit Listing</button>
        </>,
      );
    }
    function removeListing() {
      const confirm = window.confirm(
        "Are you sure you want to remove this listing?",
      );
      if (confirm) {
        dispatch(roomActions.deleteRoom(+roomId, sessionUser.id));
        history.push(`/rooms`);
        return room;
      }
    }
    function editListing() {
      return history.push(`/rooms/${room.id}/edit`);
    }
  }, [room, sessionUser?.id, dispatch, history, roomId, allAmenities]);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    const bookedDatesArr =
      roomRentals &&
      roomRentals?.map((rental) => {
        const startDate = {
          year: new Date(rental.checkIn).getFullYear(),
          month: new Date(rental.checkIn).getMonth(),
          day: new Date(rental.checkIn).getDate(),
        };
        const endDate = {
          year: new Date(rental.checkOut).getFullYear(),
          month: new Date(rental.checkOut).getMonth(),
          day: new Date(rental.checkOut).getDate(),
        };
        return [startDate, endDate];
      });

    setBookedDatesArr(bookedDatesArr);
  }, [roomRentals]);

  const listenToScroll = () => {
    let heightToHideFrom = 740;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll < heightToHideFrom) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollTo = async (location) => {
    if (location === "calendar") {
      calendarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (location === "location") {
      locationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (location === "amenities") {
      amenitiesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (location === "reviews") {
      reviewsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  };

  const datePickerPrompt = () => {
    setErrors(["Please use calendar to the left to choose dates"]);
    scrollTo("calendar");
  };

  const submitReservation = (e) => {
    e.preventDefault();

    const inYear = checkInDate.slice(0, 4);
    const inMonth = checkInDate.slice(5, 7) - 1;
    const inDay = checkInDate.slice(8, 10);

    const outYear = checkOutDate.slice(0, 4);
    const outMonth = checkOutDate.slice(5, 7) - 1;
    const outDay = checkOutDate.slice(8, 10);

    if (outYear && outDay && outMonth > -1 && inYear && inDay && inMonth > -1) {
      dispatch(
        rentalActions.createRental({
          renterId: sessionUser.id,
          roomId: room.id,
          guests,
          checkIn: new Date(inYear, inMonth, inDay),
          checkOut: new Date(outYear, outMonth, outDay),
        }),
      );
      setErrors([]);
      history.push("/reservations");
    } else {
      setErrors(["Please fill out calendar reservation dates!"]);
      scrollTo("calendar");
    }
  };

  if (!sessionUser || !room) return <Redirect to="/" />;

  return loaded ? (
    <div className="main-room-display">
      {isVisible ? (
        <div id="hide">
          <nav>
            <span onClick={e => scrollTo("amenities")}>Amenities</span>
            <span onClick={(e) => scrollTo("location")}>Location</span>
            <span onClick={e =>scrollTo("reviews")}>Reviews</span>
          </nav>
        </div>
      ) : null}
      <div className="room-detail">
        <div className="picture-box">
          <div className="main-image">
            <img alt="" src={room.imageUrl}></img>
          </div>
          <div className="smaller-images">
            <div className="smaller-image-container">
              <img alt="" className="image-1" src={room.imageUrl}></img>
            </div>
            <div className="smaller-image-container">
              <img alt="" className="image-1" src={room.imageUrl}></img>
            </div>
            <div className="smaller-image-container">
              <img alt="" className="image-1" src={room.imageUrl}></img>
            </div>
            <div className="smaller-image-container">
              <img alt="" className="image-1" src={room.imageUrl}></img>
            </div>
          </div>
        </div>
        <div className="room-display-body">
          <div className="room-info">
            <header className="room-header">
              <h2>{room.title}</h2>
            </header>
            <section>
              <p className="description">{room.description}</p>
            </section>
            <div ref={amenitiesRef} className="scroll-border"></div>
            <h2>Amenities:</h2>
            <div className="room-display-amenities">
              {amenities &&
                amenities.map((amenity, index) => {
                  if (index < amenities.length / 2 && index < 5) {
                    return (
                      <div
                        key={index}
                        className={`amenities-left row-${index}`}
                      >
                        {amenity}
                      </div>
                    );
                  } else if (
                    (index >= amenities.length / 2 || index >= 5) &&
                    index < 10
                  ) {
                    return (
                      <div
                        key={index}
                        className={`amenities-right row-${
                          index - Math.floor(amenities.length / 2)
                        }`}
                      >
                        {amenity}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
            <div ref={reviewsRef} className="scroll-border"></div>
            <div className="reviews">
              <h2>Reviews</h2>
              {amenities.length > 10 ? (
                <button>{`Show all ${amenities.length} amenities`}</button>
              ) : null}
              <div ref={calendarRef} className="calendar-div">
                {sessionUser.id === room.ownerId ? null : (
                  <>
                    <Calendar
                      first={true}
                      setCheckInDate={setCheckInDate}
                      checkInDate={checkInDate}
                      setCheckOutDate={setCheckOutDate}
                      checkOutDate={checkOutDate}
                      bookedDatesArr={bookedDatesArr}
                      setBookedDatesArr={setBookedDatesArr}
                      setErrors={setErrors}
                      firstSelectedMonth={firstSelectedMonth}
                      setFirstSelectedMonth={setFirstSelectedMonth}
                      lastSelectedMonth={lastSelectedMonth}
                      setLastSelectedMonth={setLastSelectedMonth}
                      firstSelectedDate={firstSelectedDate}
                      setFirstSelectedDate={setFirstSelectedDate}
                      lastSelectedDate={lastSelectedDate}
                      setLastSelectedDate={setLastSelectedDate}
                      firstSelectedYear={firstSelectedYear}
                      setFirstSelectedYear={setFirstSelectedYear}
                      lastSelectedYear={lastSelectedYear}
                      setLastSelectedYear={setLastSelectedYear}
                      syncForward={syncForward}
                      setSyncForward={setSyncForward}
                      syncBackward={syncBackward}
                      setSyncBackward={setSyncBackward}
                      tempLastSelectedDate={tempLastSelectedDate}
                      tempLastSelectedMonth={tempLastSelectedMonth}
                      tempLastSelectedYear={tempLastSelectedYear}
                      setTempLastSelectedDate={setTempLastSelectedDate}
                      setTempLastSelectedMonth={setTempLastSelectedMonth}
                      setTempLastSelectedYear={setTempLastSelectedYear}
                    />
                    <Calendar
                      setCheckInDate={setCheckInDate}
                      checkInDate={checkInDate}
                      setCheckOutDate={setCheckOutDate}
                      checkOutDate={checkOutDate}
                      bookedDatesArr={bookedDatesArr}
                      setBookedDatesArr={setBookedDatesArr}
                      setErrors={setErrors}
                      firstSelectedMonth={firstSelectedMonth}
                      setFirstSelectedMonth={setFirstSelectedMonth}
                      lastSelectedMonth={lastSelectedMonth}
                      setLastSelectedMonth={setLastSelectedMonth}
                      firstSelectedDate={firstSelectedDate}
                      setFirstSelectedDate={setFirstSelectedDate}
                      lastSelectedDate={lastSelectedDate}
                      firstSelectedYear={firstSelectedYear}
                      setFirstSelectedYear={setFirstSelectedYear}
                      lastSelectedYear={lastSelectedYear}
                      setLastSelectedYear={setLastSelectedYear}
                      setLastSelectedDate={setLastSelectedDate}
                      syncForward={syncForward}
                      setSyncForward={setSyncForward}
                      syncBackward={syncBackward}
                      setSyncBackward={setSyncBackward}
                      tempLastSelectedDate={tempLastSelectedDate}
                      tempLastSelectedMonth={tempLastSelectedMonth}
                      tempLastSelectedYear={tempLastSelectedYear}
                      setTempLastSelectedDate={setTempLastSelectedDate}
                      setTempLastSelectedMonth={setTempLastSelectedMonth}
                      setTempLastSelectedYear={setTempLastSelectedYear}
                    />
                  </>
                )}
              </div>
            </div>
      <div ref={locationRef} className="maps-api">
        <h2>Location</h2>
        <ul>
          <li>{room.address}</li>
          <li>
            {room.city + ", "}
            {room.state + " "}
            {room.zip}
          </li>
          <li>{room.country}</li>
          <li>{ownerButtons}</li>
        </ul>
        <iframe
          title="maps"
          width="100%"
          height="500px"
          style={{ border: 0 }}
          margin-bottom="50px"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB2831JHe127Y5QT6sKtvHfGuxpo0rKYHY&q=${room.address},${room.city},${room.state},${room.zip}`}
        ></iframe>
      </div>
          </div>
          <div className="reservation-scroller">
            <div className="reservation-box">
              <div className="pricing-ratings"></div>
              <p className="reservation-error">{errors}</p>
              <form onSubmit={submitReservation} className="reservation-form">
                <label
                  className={
                    errors.length
                      ? "reservation-checkin reservation-error"
                      : "reservation-checkin"
                  }
                >
                  <input
                    type="text"
                    onClick={(sessionUser?.id === room.ownerId) ? null : datePickerPrompt}
                    value={checkInDate || "Check In"}
                    readOnly={true}
                  ></input>
                </label>
                <label
                  className={
                    errors.length
                      ? "reservation-checkout reservation-error"
                      : "reservation-checkout"
                  }
                >
                  <input
                    type="text"
                    value={checkOutDate || "Check Out"}
                    onClick={(sessionUser?.id === room.ownerId) ? null : datePickerPrompt}
                    readOnly={true}
                  ></input>
                </label>
                <label className="reservation-guests">
                  <input
                    type="number"
                    value={guests}
                    readOnly={(sessionUser?.id === room.ownerId)}
                    onChange={(e) =>
                      e.target.value < 10 && e.target.value > 0
                        ? setGuests(e.target.value)
                        : null
                    }
                  ></input>
                  <b>Guests</b>
                </label>
                <button
                  className="reservation-button"
                  id={sessionUser.id === room.ownerId ? "disabled" : null}
                  disabled={sessionUser.id === room.ownerId}
                >
                  Reserve
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default RoomDetail;
