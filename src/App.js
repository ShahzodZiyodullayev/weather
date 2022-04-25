import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import {
  setCurrentWeather,
  setDailyWeather,
  setHourlyWeather,
} from "./redux/actions/weatherActions";

const api = {
  key: "b60784f97169c5d1da965fb3dcf63b17",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [currentLocation, setCurrentLocation] = useState();
  const dispatch = useDispatch();

  const select = (e) => {
    fetchData((e[1] + e[3]) / 2, (e[0] + e[2]) / 2);
  };

  const fetchData = (lat, lon) => {
    let latitude;
    let longitude;
    if (lat === undefined && lon === undefined) {
      getLocation();
    } else {
      latitude = lat;
      longitude = lon;
    }
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e) => {
          getWeatherData(e.coords.latitude, e.coords.longitude);
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.coords.longitude},${e.coords.latitude}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
            )
            .then((e) => setCurrentLocation(e.data.features[1].place_name))
            .then((e) => console.log(e));
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getWeatherData(latitude, longitude);
  };

  const getWeatherData = async (lat, lon) => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${api.key}`,
      )
      .then((e) => {
        dispatch(setCurrentWeather(e.data.current));
        dispatch(setDailyWeather(e.data.daily));
        dispatch(setHourlyWeather(e.data.hourly));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // console.log(currentWeather);

  return (
    <>
      <Home
        select={select}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
    </>
  );
}

export default App;
