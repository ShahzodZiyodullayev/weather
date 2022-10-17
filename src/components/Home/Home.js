import React, { useState, useEffect } from "react";
import LeftSide from "../LeftSide/LeftSide";
import RightSide from "../RightSide/RightSide";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
// import { createClient } from "pexels";
import { createApi } from "unsplash-js";
import { XlviLoader } from "react-awesome-loaders";
import { useSpring, animated, config } from "react-spring";
import "./style.css";

function Home(props) {
  const { currentLocation } = props;
  const [photos, setPhotos] = useState("");
  const current = useSelector((state) => state.current);

  useEffect(() => {
    // if (current.length > 0) {
    //   setLoading(false);
    // }
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

  const prop = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    // reset: true,
    delay: 300,
    config: config.molasses,
  });

  return (
    <Grid padding={3} height="100vh">
      <Grid container columnSpacing={3} rowSpacing={2} height="100%">
        <animated.div style={prop}>
          <Grid
            className="home"
            sx={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: -100,
              position: "fixed",
              // backgroundImage: `url(${photos})`,
              background: "linear-gradient(to right, #e65c00, #F9D423)",
            }}
          />
        </animated.div>
        <LeftSide currentLocation={currentLocation} />
        <RightSide />
      </Grid>
    </Grid>
  );
}

export default Home;
