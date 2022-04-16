import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import {
  Box,
  List,
  IconButton,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { X } from "react-feather";
import { UilSearch } from "@iconscout/react-unicons";
import styles from "./index.module.css";
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
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${e}.json?access_token=pk.eyJ1Ijoic3NoYWh6b2Q1IiwiYSI6ImNrdmU3OWNsbTBwb2sydm8wdDhtNXNpcjEifQ.mCFcaq4qpndtaSXJ2OaQYw`,
      });
      // console.log("aaaaaaaaa: ", res.data.features);
      if (res && res.data) {
        if (res.data.features && res.data.features.length > 0) {
          let tmp = res.data.features.map((item) => {
            return {
              label: `${item.place_name}`,
              coor: item.bbox,
            };
          });
          // console.log("State: ", tmp);
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
        sx={{
          visibility: visible === true ? "visible" : "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 10,
        }}
      ></Box>
      <Box sx={{ position: "relative", zIndex: 20 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            height: "36px",
            background: "white",
          }}
        >
          <DebounceInput
            minLength={2}
            debounceTimeout={500}
            value={locationValue}
            onChange={(e) => handleChangeLocationValue(e.target.value)}
            className={styles.input}
            style={{ visibility: visible ? "visible" : "hidden" }}
          />
          <Box
            mt="10px"
            sx={{
              visibility: locationValue ? "visible" : "hidden",
              cursor: "pointer",
            }}
            onClick={(e) => handleChangeLocationValue("")}
          >
            <X size={20} onClick={() => setVisible(false)} color="#757575" />
          </Box>
          <Box mt="7px" mr="5px">
            <UilSearch
              size={20}
              color="#757575"
              cursor="pointer"
              onClick={() => {
                setVisible(visible === true ? false : true);
                setLocationValue("");
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            // visibility: visible === true ? "visible" : "hidden",
            visibility:
              locationValue === "" && visible === false
                ? "hidden"
                : locationValue === "" && visible === true
                ? "hidden"
                : "visible",
          }}
        >
          <List
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(330deg, #11998e 0%, #38ef7d 100% )",
              mt: "10px",
              boxShadow:
                "0px 4px 5px 0 rgba(0,0,0,0.2), 0px 5px 15px 0 rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      No results
                    </div>
                  )
                ) : (
                  <>
                    {citiesNotFound ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Data not Found
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {inError}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
}
