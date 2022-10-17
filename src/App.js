import { lazy, Suspense, useEffect, useState } from "react";
import { SunspotLoader } from "react-awesome-loaders";
import { Grid } from "@mui/material";

const Home = lazy(() => import("./components/Home"));

function App() {
  // const [playAnimation, setPlayAnimation] = useState(false);

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
        <SunspotLoader
          gradientColors={["#6366F1", "#E0E7FF"]}
          shadowColor={"#3730A3"}
          desktopSize={"128px"}
          mobileSize={"100px"}
        />
      </Grid>
    );
  };
  // // This will run one time after the component mounts
  // useEffect(() => {
  //   const onPageLoad = () => {
  //     setPlayAnimation(true);
  //   };

  //   // Check if the page has already loaded
  //   if (document.readyState === "complete") {
  //     onPageLoad();
  //   } else {
  //     window.addEventListener("load", onPageLoad);
  //     // Remove the event listener when component unmounts
  //     return () => window.removeEventListener("load", onPageLoad);
  //   }
  // }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </>
  );
}

export default App;
