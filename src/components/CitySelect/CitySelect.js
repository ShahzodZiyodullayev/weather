import React, { useState } from "react";
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

export default function CitySelect(props) {
  const { select, setCurrentLocation } = props;
  const [locations, setLocations] = useState(null);
  const [locationValue, setLocationValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inError, setInError] = useState(null);
  const [citiesNotFound, setCitiesNotFound] = useState(false);

  const click = (e) => {
    select(e.coor);
    setLocationValue(e.label);
    setCurrentLocation(e.label);
  };

  const handleChangeLocationValue = (value) => {
    if (value) {
      setLocationValue(value);
      getLocations(value);
    } else {
      setLocationValue("");
      // setVisible(false);
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
      // log("error", err.message);
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          setVisible(false);
          setLocationValue("");
        }}
        className={`searchIcon ${visible === true ? "visible" : "hidden"}`}
      ></Box>
      <Box sx={{ position: "relative", zIndex: 20 }}>
        <Box className="inputField">
          <DebounceInput
            minLength={2}
            debounceTimeout={500}
            value={locationValue}
            onChange={(e) => handleChangeLocationValue(e.target.value)}
            className={`input ${visible ? "visible" : "hidden"}`}
          />
          <Box
            className={`xContainer ${locationValue ? "visible" : "hidden"}`}
            onClick={(e) => handleChangeLocationValue("")}
          >
            <X size={20} onClick={() => setVisible(false)} color="#757575" />
          </Box>
          <Box mt="7px" mr="5px">
            <UilSearch
              size={20}
              className="UilSearch"
              onClick={() => {
                setVisible(visible === true ? false : true);
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
                          <Typography noWrap>{item.label}</Typography>
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
    </>
  );
}
