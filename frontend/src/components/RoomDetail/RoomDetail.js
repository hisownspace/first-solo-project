import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as roomActions from "../../store/room";
import Calendar from "../Calendar/Calendar";



function RoomDetail() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const history = useHistory();
  const amenitiesRef = useRef();
  
  const room = useSelector((state) => state.room.currentRoom);
  const sessionUser = useSelector((state) => state.session.user);
  const [amenities, setAmenities] = useState([]);
  let [ownerButtons, setOwnerButtons] = useState('');
  let [renterOptions, setRenterOptions] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
  }, [checkOutDate, checkInDate])
  
  useEffect(() => {
    dispatch(roomActions.readRoom(+roomId));
  }, []);
  
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
  }, [room]);

  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])

  function removeListing() {
    const confirm = window.confirm('Are you sure you want to remove this listing?')
    if (confirm) {
      dispatch(roomActions.deleteRoom(+roomId, sessionUser.id));
      history.push(`/rooms`);
      return room;
    }
  };

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

  const scrollTo = e => {
    amenitiesRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  };

  function editListing() {
    return history.push(`/rooms/${room.id}/edit`);
  };

  function makeReservation() {
    return;
  }
  function showAmenities() {

  };

  const submitReservation = e => {
    e.preventDefault()
    console.log(checkInDate, checkOutDate)
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
        {/* <div className='main-image'> */}
          <img alt="" src={room.imageUrl}></img>
        {/* </div> */}
        <div className='smaller-images'>
          <img alt="" className='image-1' src={room.imageUrl}></img>
          <img alt="" className='image-2' src={room.imageUrl}></img>
          <img alt="" className='image-3' src={room.imageUrl}></img>
          <img alt="" className='image-4' src={room.imageUrl}></img>
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
            {amenities.length > 10 ? <button style={{width:'25%', margin: "25px auto"}} onClick={showAmenities}>{`Show all ${amenities.length} amenities`}</button> : null}
        <div className="calendar-div">
        <Calendar
        setCheckInDate={setCheckInDate}
        checkInDate={checkInDate}
        setCheckOutDate={setCheckOutDate}
        checkOutDate={checkOutDate}
        />
        </div>
        </div>
        <div className='reservation-scroller'>
          <div className='reservation-box'>
            <div className='pricing-ratings'></div>
            <form onSubmit={submitReservation} className='reservation-form' >
              <label className='reservation-checkin'>
                <input
                type='date'
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
                >
                </input>
              </label>
              <label className='reservation-checkout'>
                <input
                type='date'
                value={checkOutDate}
                onChange={e => e.target.value > checkInDate ? setCheckOutDate(e.target.value) : null}
                >
                </input>
              </label>
              <label className='reservation-guests'>
                <input>
                </input>
              </label>
              <button className='reservation-button' id={sessionUser.id === room.ownerId ? 'disabled' : null} disabled={sessionUser.id === room.ownerId}>Reserve</button>
            </form>
            <div className='itemization'>
              <div className='reservation-items'></div>
              <div className='reservation-total'></div>
            </div>
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
        {ownerButtons ? ownerButtons : renterOptions}
        {/* {renterOptions ? renterOptions : null} */}
      </li>
    </div>
    </div>
  )
}

export default RoomDetail;