import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Avatar, Stack, Paper, Grid } from "@mui/material";
import CitySelect from "../CitySelect";
import InfoCard from "../InfoCard/InfoCard";
import { UilBell } from "@iconscout/react-unicons";
import {
  WiHorizonAlt,
  WiHorizon,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiWindDeg,
} from "react-icons/wi";
import { useSpring, animated, config } from "react-spring";
import "./styles.css";

function LeftSide() {
  const [InfoCardDataList, setInfoCardDataList] = useState(null);
  const current = useSelector((item) => item.current);
  const currentLocation = useSelector((item) => item.location);

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    delay: 200,
    config: config.molasses,
  });

  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: Math.round(current.temp - 273.15),
    delay: 200,
    config: config.molasses,
  });
  // console.log(current.weather[0].icon);
  // let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // const date = () => {
  //   let newDate = new Date();
  //   let month = monthName[newDate.getMonth()];
  //   let day = newDate.getDate();
  //   let year = newDate.getFullYear();
  //   setCurrentDate(`${month} ${day}, ${year}`);
  // };

  // let InfoCardDataList = null;

  const getTimefromUnix = (arg) => {
    const date = new Date(arg * 1000);
    return date.getHours() + ":" + date.getMinutes();
  };

  const setInfoData = () => {
    if (
      current &&
      current.sunrise &&
      current.sunset &&
      current.humidity &&
      current.pressure &&
      current.wind_deg &&
      current.wind_speed
    ) {
      setInfoCardDataList([
        {
          name: "Sunrise",
          icon: <WiHorizonAlt size={50} color="white" />,
          value: getTimefromUnix(current.sunrise),
        },
        {
          name: "Sunset",
          icon: <WiHorizon size={50} color="white" />,
          value: getTimefromUnix(current.sunset),
        },
        {
          name: "Humidity",
          icon: <WiHumidity size={50} color="white" />,
          value: current.humidity + "%",
        },
        {
          name: "Pressure",
          icon: <WiBarometer size={50} color="white" />,
          value: current.pressure + "mb",
        },
        {
          name: "Wind Speed",
          icon: <WiStrongWind size={50} color="white" />,
          value: current.wind_speed + "m/s",
        },
        {
          name: "Wind degree",
          icon: (
            <WiWindDeg
              size={50}
              color="white"
              style={{ transform: `rotate(${current.wind_deg}deg)` }}
            />
          ),
          value: current.wind_deg + "°",
        },
      ]);
    }
  };

  useEffect(() => {
    setInfoData();
  }, [current]);

  return (
    <Grid item xs sm={12} md={12} lg={4} xl={3} className="left-side_container">
      <Grid className="left-side_content" padding={3} direction="column">
        <Grid className="tools_bar">
          <CitySelect />
          <Stack direction="row" spacing={2} className="tools_bar_stack">
            <Avatar
              variant="square"
              sx={{ borderRadius: "10px", background: "transparent" }}
            >
              <UilBell />
            </Avatar>
            <Avatar
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
              variant="square"
              sx={{ borderRadius: "10px" }}
            />
          </Stack>
        </Grid>

        {InfoCardDataList !== null && (
          <animated.div style={props}>
            <Grid>
              <Grid container className="sunrise_and_sunset">
                {InfoCardDataList.map((i, ind) => (
                  <InfoCard
                    key={ind}
                    icon={i.icon}
                    name={i.name}
                    value={i.value}
                  />
                ))}
              </Grid>
            </Grid>
          </animated.div>
        )}

        {current && current.temp && (
          <Grid className="temperature">
            <Typography className="temperature_value" variant="body">
              {current && current.temp && (
                <animated.div>
                  {number.to((n) => n.toFixed())}
                  {/* `${Math.round(current.temp - 273.15)}` */}
                </animated.div>
              )}
              <span className="temperature_round">°</span>
            </Typography>
            {currentLocation && (
              <Typography
                className="current_location"
                display="block"
                noWrap
                variant="body"
              >
                {currentLocation.data}
              </Typography>
            )}
            <br />
            <Typography className="temperature_description" variant="body">
              {current && current.weather && current.weather[0].description}
            </Typography>
            {/* <img
            style={{ marginLeft: "-20px" }}
            src={`http://openweathermap.org/img/wn/${current && current.weather && current.weather[0].icon
              }@2x.png`}
          /> */}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default LeftSide;
