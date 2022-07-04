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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (lat, lon) => {
    if (lat === undefined && lon === undefined) {
      getLocation();
    } else {
      getWeatherData(lat, lon);
    }
  };

  const select = (e) => {
    fetchData((e[1] + e[3]) / 2, (e[0] + e[2]) / 2);
  };

  const getData = async (la, lo) => {
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lo},${la}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
      )
      .then((e) => setCurrentLocation(e.data.features[1].place_name));
  };

  const getLocation = () => {
    const watchPositionParams = [
      (pos) => {
        getData(pos.coords.latitude, pos.coords.longitude);
        getWeatherData(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        getData(41.2981555, 69.2808155);
        getWeatherData(41.2981555, 69.2808155);
      },
      {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 0,
      },
    ];
    navigator.geolocation.watchPosition(...watchPositionParams);
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

  return (
    <div>
      <Home
        select={select}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
    </div>
  );
}

export default App;
