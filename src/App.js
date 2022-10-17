import { lazy, Suspense, useEffect, useState } from "react";
import { Grid } from "@mui/material";

const Home = lazy(() => import("./components/Home"));

function App() {
  const Loading = () => {
    return (
      <Grid
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("./assets/animation_640_l9cjegmk.gif")}
          alt="loading"
        />
      </Grid>
    );
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </>
  );
}

export default App;
