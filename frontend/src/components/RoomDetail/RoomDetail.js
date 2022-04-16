import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as roomActions from "../../store/room";
import * as rentalActions from "../../store/rental";
import Calendar from "../Calendar/Calendar";



function RoomDetail() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const history = useHistory();
  const calendarRef = useRef();
  const amenitiesRef = useRef();
  
  const room = useSelector((state) => state.room.currentRoom);
  const sessionUser = useSelector((state) => state.session.user);
  const roomRentals = useSelector((state) => state.rental.roomRentals);
  const [ errors, setErrors] = useState(false);
  const [amenities, setAmenities] = useState([]);
  let [ownerButtons, setOwnerButtons] = useState('');
  let [renterOptions, setRenterOptions] = useState('');
  const [checkInDate, setCheckInDate] = useState('mm/dd/yy');
  const [checkOutDate, setCheckOutDate] = useState('mm/dd/yy');
  const [bookedDatesArr, setBookedDatesArr] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    dispatch(roomActions.readRoom(+roomId));
    dispatch(rentalActions.readRoomRentals(+roomId));
  }, [dispatch, roomId]);
  
  useEffect(() => {
    if (room.amenities) {setAmenities(room.amenities.split(', '))};
    if (sessionUser?.id === room.ownerId) {
      setOwnerButtons(
        <>
        <button onClick={removeListing}>Remove Listing</button>
        <button onClick={editListing}>Edit Listing</button>
      </>);
      setRenterOptions(null)
    } else {
      setRenterOptions(
        <>
        <button onClick={makeReservation}>Make Reservation</button>
      </>);
      setOwnerButtons(null);
    }
    function removeListing() {
      const confirm = window.confirm('Are you sure you want to remove this listing?')
      if (confirm) {
        dispatch(roomActions.deleteRoom(+roomId, sessionUser.id));
        history.push(`/rooms`);
        return room;
      }
    };
    function editListing() {
      return history.push(`/rooms/${room.id}/edit`);
    };

  }, [room, sessionUser?.id, dispatch, history, roomId]);

  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])


  useEffect(() => {
    const bookedDatesArr = roomRentals && roomRentals?.map(rental => {
      const startDate = {
        year: new Date(rental.checkIn).getFullYear(),
        month: new Date(rental.checkIn).getMonth(),
        day: new Date(rental.checkIn).getDate()
      };
      const endDate = {
        year: new Date(rental.checkOut).getFullYear(),
        month: new Date(rental.checkOut).getMonth(),
        day: new Date(rental.checkOut).getDate()
      };
      return [startDate, endDate];
    });

    setBookedDatesArr(bookedDatesArr);
  }, [roomRentals]);

  const listenToScroll = () => {
    let heightToHideFrom = 740;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
       
    if (winScroll < heightToHideFrom) { 
         setIsVisible(false);
    } else {
         setIsVisible(true);
    }  
  };

  const scrollTo = async (e, location) => {
    if (location === 'calendar') {
      calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      amenitiesRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };


  function makeReservation() {
    return;
  }
  function showAmenities() {

  };

  const submitReservation = e => {
    e.preventDefault();
    
    const inYear = checkInDate.slice(0,4);
    const inMonth = checkInDate.slice(5,7) - 1;
    const inDay = checkInDate.slice(8,10);

    const outYear = checkOutDate.slice(0,4);
    const outMonth = checkOutDate.slice(5,7) - 1;
    const outDay = checkOutDate.slice(8,10);


    if (outYear && outDay && outMonth > -1 &&
        inYear && inDay && inMonth > -1) {
          dispatch(rentalActions.createRental({ 
            renterId: sessionUser.id,
            roomId: room.id,
            guests,
            checkIn: new Date(inYear, inMonth, inDay, 16),
            checkOut: new Date(outYear, outMonth, outDay, 9)
          }));
          setErrors(false);
          history.push('/reservations');
    } else {
      setErrors(true);
      scrollTo(e, 'calendar')
    }
    
  };

  if (!sessionUser || !room) return <Redirect to="/" />;
  
  return (
    <div className='main-room-display'>
    {isVisible 
      ? 
    <div id="hide">
      <nav>
        <span onClick={scrollTo}>
          Amenities
        </span>
        <span onClick={scrollTo}>
          Location
        </span>
        <span onClick={scrollTo}>
          Reviews
        </span>
      </nav>  
    </div> : null}
    <div className='room-detail'>
      <div className='picture-box'>
        <div className='main-image'>
          <img alt="" src={room.imageUrl}></img>
        </div>
        <div className='smaller-images'>
          <div className="smaller-image-container">
            <img alt="" className='image-1' src={room.imageUrl}></img>
          </div>
          <div className="smaller-image-container">
            <img alt="" className='image-1' src={room.imageUrl}></img>
          </div>
          <div className="smaller-image-container">
            <img alt="" className='image-1' src={room.imageUrl}></img>
          </div>
          <div className="smaller-image-container">
            <img alt="" className='image-1' src={room.imageUrl}></img>
          </div>
        </div>
      </div>
      <div className='room-display-body'>
        <div className='room-info'>
        <header className='room-header'>
          <h2>{room.title}</h2>
        </header>
        <section>
          <p className='description'>{room.description}</p>
        </section>
          <h2>Amenities:</h2>
        <div className='room-display-amenities' ref={amenitiesRef}>
            {amenities && amenities.map((amenity, index) => {
              if (index < amenities.length / 2 && index < 5) {
                return <div key={index} className={`amenities-left row-${index}`}>{amenity}</div>
              } else if ((index >= amenities.length / 2 || index >= 5) && index < 10){
                return <div key={index} className={`amenities-right row-${index - Math.floor(amenities.length / 2)}`}>{amenity}</div>
              } else {
                return null;
              }
            })}
        </div>
          <div className="reviews">
            <h2>
              Reviews
            </h2>
            {amenities.length > 10 ? <button onClick={showAmenities}>{`Show all ${amenities.length} amenities`}</button> : null}
        <div ref={calendarRef} className="calendar-div">
       {sessionUser.id === room.ownerId ? null : <Calendar
        setCheckInDate={setCheckInDate}
        checkInDate={checkInDate}
        setCheckOutDate={setCheckOutDate}
        checkOutDate={checkOutDate}
        bookedDatesArr={bookedDatesArr}
        setBookedDatesArr={setBookedDatesArr}
        setErrors={setErrors}
        />}

        </div>
        </div>
        </div>
        <div className='reservation-scroller'>
          <div className='reservation-box'>
            <div className='pricing-ratings'></div>
            <p className="reservation-error">{errors ? 'Please fill out reservation dates' : null}</p>
            <form onSubmit={submitReservation} className='reservation-form' >
              <label className={errors ? 'reservation-checkin reservation-error' : 'reservation-checkin'}>
                <input
                type='text'
                onChange={e => {setCheckInDate(e.target.value)}}
                value={checkInDate}
                readOnly={true}
                >
                </input>
              </label>
              <label className={errors ? 'reservation-checkout reservation-error' : 'reservation-checkout'}>
                <input
                type='text'
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                readOnly={true}
                >
                </input>
              </label>
              <label className='reservation-guests'>
                <input
                type='number'
                value={guests}
                onChange={e => (e.target.value < 10 && e.target.value > 0)? setGuests(e.target.value): null}
                >
                </input>
                <b>Guests</b>
              </label>
              <button className='reservation-button' id={sessionUser.id === room.ownerId ? 'disabled' : null} disabled={sessionUser.id === room.ownerId}>Reserve</button>
            </form>
            {/* <div className='itemization'>
              <div className='reservation-items'></div>
              <div className='reservation-total'></div>
            </div> */}
          </div>
        </div>
        
      </div>
      <li>
        {room.address}
      </li>
      <li>
        {room.city + ', '}
        {room.state + ' '}
        {room.zip}
      </li>
      <li>
        {room.country}
      </li>
      <li>
        {ownerButtons ? ownerButtons : null}
        {/* {renterOptions ? renterOptions : null} */}
      </li>

    </div>
      <iframe
      title="maps"
      width="80%"
      height="750px"
      style={{border:0}}
      margin='50px'
      loading="lazy"
      allowfullscreen
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD3hn84hMnejar3EM_EdSjZ-RVXhTar-OQ&q=${room.city},${room.state}`}>
</iframe>
    </div>
  )
}

export default RoomDetail;