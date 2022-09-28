import React, { useState } from "react";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { createClient } from "pexels";
import "./style.css";

function Home(props) {
  const { currentLocation } = props;
  const [photos, setPhotos] = useState("");
  const current = useSelector((state) => state.current);

  // if (current && current.weather) {
  //   const client = createClient(
  //     "563492ad6f917000010000014779d010e7dc4223b3ddb3fa3015e28e",
  //     // "563492ad6f91700001000001b6fde700f576471ca84ed7fd449385e5",
  //   );
  //   const query = current.weather[0].description;

  //   client.photos
  //     .search({ query, per_page: 1 })
  //     .then((photos) => setPhotos(photos.photos[0].src.original));
  // }

  return (
    <Grid
      padding={3}
      className="home"
      sx={{
        backgroundImage: `url(${photos})`,
      }}
    >
      <Grid container columnSpacing={3} height="100%">
        <LeftSide currentLocation={currentLocation} />
        <RightSide />
      </Grid>
    </Grid>
  );
}

export default Home;
