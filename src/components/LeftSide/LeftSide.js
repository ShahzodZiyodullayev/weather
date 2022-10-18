import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Avatar, Stack, Grid } from "@mui/material";
import { UilBell } from "@iconscout/react-unicons";
import CitySelect from "../CitySelect";
import InfoCard from "../InfoCard/InfoCard";
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
    delay: 500,
    config: config.molasses,
  });
  const { number } = useSpring({
    from: { number: 0 },
    number: current.temp ? Math.round(current.temp - 273.15) : 0,
    delay: 900,
    config: config.molasses,
  });

  useEffect(() => {
    setInfoData();
  }, [current]);

  const getTimefromUnix = (arg) => {
    const date = new Date(arg * 1000);
    return date.getHours() + ":" + String(date.getMinutes()).padStart(2, 0);
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
          icon: <WiHorizonAlt size={50} color="#ffffff" />,
          value: getTimefromUnix(current.sunrise),
        },
        {
          name: "Sunset",
          icon: <WiHorizon size={50} color="#ffffff" />,
          value: getTimefromUnix(current.sunset),
        },
        {
          name: "Humidity",
          icon: <WiHumidity size={50} color="#ffffff" />,
          value: current.humidity + "%",
        },
        {
          name: "Pressure",
          icon: <WiBarometer size={50} color="#ffffff" />,
          value: current.pressure + "mb",
        },
        {
          name: "Wind Speed",
          icon: <WiStrongWind size={50} color="#ffffff" />,
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

  return (
    <Grid item xs sm={12} md={12} lg={4} xl={3} className="left-side_container">
      <animated.div className="max_height" style={props}>
        <Grid className="left-side_content" padding={3}>
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
            <Grid>
              <Grid container className="sunrise_and_sunset">
                {InfoCardDataList.map((i, ind) => (
                  <InfoCard
                    key={ind}
                    icon={i.icon}
                    name={i.name}
                    value={i.value}
                    type="current"
                  />
                ))}
              </Grid>
            </Grid>
          )}

          {current && current.temp && (
            <Grid className="temperature">
              <Typography className="temperature_value" variant="body">
                {current && current.temp && (
                  <animated.div>{number.to((n) => n.toFixed())}</animated.div>
                )}
                <span className="temperature_round">°</span>
              </Typography>
              {currentLocation && (
                <Typography
                  className="current_location_name"
                  display="block"
                  noWrap
                  variant="body"
                >
                  {currentLocation.data}
                </Typography>
              )}
              <Typography className="temperature_description" variant="body">
                {current && current.weather && current.weather[0].description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </animated.div>
    </Grid>
  );
}

export default LeftSide;
