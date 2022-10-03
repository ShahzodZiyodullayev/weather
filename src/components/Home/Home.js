import React, { useState, useEffect } from "react";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { createClient } from "pexels";
import { createApi } from "unsplash-js";
import "./style.css";

function Home(props) {
  const { currentLocation } = props;
  const [photos, setPhotos] = useState("");
  const current = useSelector((state) => state.current);

  useEffect(() => {
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

    const unsplash = createApi({
      accessKey: "gqV_1vvQFYJPCbekBH2r66Kx6uR3EJCGBasb_QnoBXw",
    });

    if (current && current.weather) {
      const query = current.weather[0].description;
      unsplash.search
        .getPhotos({
          query,
          page: 1,
          perPage: 1,
          orientation: "landscape",
        })
        .then((e) => setPhotos(e.response.results[0].urls.full));
    }
  }, [current]);

  return (
    <Grid
      padding={3}
      className="home"
      sx={{
        // height: "100vh",
        backgroundImage: `url(${photos})`,
      }}
    >
      <Grid container columnSpacing={3} rowSpacing={2} height="100%">
        <LeftSide currentLocation={currentLocation} />
        <RightSide />
      </Grid>
    </Grid>
  );
}

export default Home;
