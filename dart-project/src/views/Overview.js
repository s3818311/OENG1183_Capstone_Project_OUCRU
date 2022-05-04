import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import BarChartContainer from "../components/overview/BarChartContainer";
import ChoroplethChartContainer from "../components/overview/ChoroplethChartContainer";

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
          <BarChartContainer xs={12} md={7} lg={7} />

          <ChoroplethChartContainer xs={12} md={5} lg={5} />

          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: "flex", flexDirection: "column" }}
            ></Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Overview;
