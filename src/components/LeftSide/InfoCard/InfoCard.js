import React from "react";
import { Grid } from "@mui/material";

function InfoCard({icon}) {
  return (
    <Grid item container md className="sunrise_and_sunset_left">
      <Grid md>
        {icon}
        {/* <WiHorizonAlt size={50} color="white" /> */}
      </Grid>
      <Grid md>Two</Grid>
    </Grid>
  );
}

export default InfoCard;
