import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as roomActions from "./store/room";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.roomActions = roomActions;
}

function Root() {

  useEffect(() => {
  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position);
  //     localStorage.setItem('longitude', position.coords.longitude);
  //     localStorage.setItem('latitude', position.coords.latitude);
  //   })
  //   
  // } else {
    (async () => {
    const lng = parseFloat(localStorage.getItem("longitude"));
    const lat = parseFloat(localStorage.getItem("latitude"));
      if (!lng || !lat) {
        const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEO_KEY}`);
        const body = await res.json();
        console.log(body);
        localStorage.setItem('longitude', body.longitude);
        localStorage.setItem('latitude', body.latitude);
      }
    })();
  // }
  }, [])

  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
