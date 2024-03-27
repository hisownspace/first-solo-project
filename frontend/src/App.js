import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MakeNewListing from "./components/MakeNewListing";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import RoomsList from "./components/RoomsList";
import UpdateListing from "./components/UpdateListing";
import Reservations from "./components/Reservations";
import Splash from "./components/Splash";
import RoomSearch from "./components/Search";
import "./components/Calendar";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {sessionUser && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/rooms">
            <RoomsList />
          </Route>
          <Route path="/rooms/search/:string">
            <RoomSearch />
          </Route>
          <Route path="/rooms/make">
            <MakeNewListing />
          </Route>
          <Route path="/rooms/:roomId/edit">
            <UpdateListing />
          </Route>
          <Route path="/rooms/:roomId">
            <RoomDetail />
          </Route>
          <Route path="/reservations">
            <Reservations />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
