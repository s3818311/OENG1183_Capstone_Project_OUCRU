import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import BarChartContainer from "../components/overview/BarChartContainer";
import HCMChoroplethContainer from "../components/overview/HCMChoroplethContainer";
import LineChartContainer from "../components/overview/LineChartContainer";
import MyMap from "../components/overview/TempMap";

const Overview = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Box sx={{ mt: 4, mb: 4, ml: 3, mr: 3 }}>
        <Grid container spacing={3}>
          <BarChartContainer xs={12} md={12} lg={6} />
          <LineChartContainer xs={12} md={12} lg={6} />

          <MyMap />
        </Grid>
      </Box>
    </Box>
  );
};

export default Overview;
