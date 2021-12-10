import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MakeNewListing from "./components/MakeNewListing";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import Calendar from "./components/Calendar";
import RoomsList from "./components/RoomsList";
import UpdateListing from "./components/UpdateListing";
import Reservations from "./components/Reservations";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <div className='main'> */}
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/rooms">
            <RoomsList />
          </Route>
          <Route path="/rooms/make">
            <MakeNewListing />
          </Route>
          <Route path="/rooms/:roomId/edit">
            <UpdateListing />
          </Route>
          <Route path='/rooms/:roomId'>
            <RoomDetail />
          </Route>
          <Route path='/reservations'>
            <Reservations />
          </Route>
        </Switch>
      )}
      {/* </div> */}
    </>
  );
}

export default App;