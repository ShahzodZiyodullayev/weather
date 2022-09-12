import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import {
  Box,
  List,
  Grid,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { X } from "react-feather";
import { UilSearch } from "@iconscout/react-unicons";
import "./style.css";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCurrentWeather,
  setDailyWeather,
  setHourlyWeather,
  setCurrentLocation,
} from "./../../redux/actions/weatherActions";

const api = {
  key: "84ada803766b939df1d02655a56b5a20",
  baseUrl: "https://api.openweathermap.org/data/3.0/",
};

export default function CitySelect(props) {
  // const [currentLocation, setCurrentLocation] = useState();
  const [locations, setLocations] = useState(null);
  const [locationValue, setLocationValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inError, setInError] = useState(null);
  const [citiesNotFound, setCitiesNotFound] = useState(false);

  const select = (e) => {
    fetchData((e[1] + e[3]) / 2, (e[0] + e[2]) / 2);
  };
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

  const getData = async (la, lo) => {
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lo},${la}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
      )
      .then((e) => dispatch(setCurrentLocation(e.data.features[1].place_name)))
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

  const click = (e) => {
    select(e.coor);
    setLocationValue(e.label);
    dispatch(setCurrentLocation(e.label));
  };

  const handleChangeLocationValue = (value) => {
    if (value) {
      setLocationValue(value);
      getLocations(value);
    } else {
      setLocationValue("");
    }
  };

  const getLocations = async (e) => {
    setLoading(true);
    try {
      setVisible(true);
      let res = await axios({
        method: "GET",
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNsMjRqb2V3NzBhMDIzY3F6N3p3c2MyZGsifQ.hhX6yDNbtjOrROsYkiue7g`,
      });
      if (res && res.data) {
        if (res.data.features && res.data.features.length > 0) {
          let tmp = res.data.features.map((item) => {
            return {
              label: `${item.place_name}`,
              coor: item.bbox,
            };
          });
          if (tmp) {
            setLocations(tmp);
          }
        } else {
          setCitiesNotFound(true);
          setLocations(null);
        }
      } else {
        setLocations(null);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") {
        setInError(err.message);
      }
    }
  };

  return (
    <Grid className="cont">
      <Box
        onClick={() => {
          setVisible(false);
          setLocationValue("");
        }}
        className={`searchIcon ${visible === true ? "visible" : "hidden"}`}
      ></Box>
      <Box className="input_container">
        <Box className="inputField">
          <DebounceInput
            placeholder="Search..."
            minLength={2}
            debounceTimeout={500}
            value={locationValue}
            onChange={(e) => handleChangeLocationValue(e.target.value)}
            className="input"
            // className={`input ${visible ? "visible" : "hidden"}`}
          />
          <Box
            className={`xContainer ${locationValue ? "visible" : "hidden"}`}
            onClick={(e) => handleChangeLocationValue("")}
          >
            <X size={20} onClick={() => setVisible(false)} color="#757575" />
          </Box>
          <Box className="UilSearch">
            <UilSearch
              size={23}
              onClick={() => {
                // setVisible(visible === true ? false : true);
                setLocationValue("");
              }}
            />
          </Box>
        </Box>

        <Box
          className={`autocomplateContainer ${
            locationValue === "" && visible === false
              ? "hidden"
              : locationValue === "" && visible === true
              ? "hidden"
              : "visible"
          }`}
        >
          <List className="list">
            {!loading ? (
              <>
                {locations ? (
                  locations.length > 0 ? (
                    locations.map((item, i) => (
                      <ListItemButton key={i} sx={{ height: "35px" }}>
                        <ListItemText onClick={() => click(item)}>
                          <Typography sx={{ fontFamily: "Comfortaa" }} noWrap>
                            {item.label}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    ))
                  ) : (
                    <Grid className="noResult">No results</Grid>
                  )
                ) : (
                  <>
                    {citiesNotFound ? (
                      <Grid className="noResult">Data not Found</Grid>
                    ) : (
                      <Grid className="noResult">{inError}</Grid>
                    )}
                  </>
                )}
              </>
            ) : (
              <Grid className="noResult">
                <CircularProgress />
              </Grid>
            )}
          </List>
        </Box>
      </Box>
    </Grid>
  );
}
