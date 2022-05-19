import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import BarChartContainer from "../components/statistic/BarChartContainer";
import LineChartContainer from "../components/statistic/LineChartContainer";
import StreamChartContainer from "../components/statistic/StreamChartContainer";
import PieChartContainer from "../components/statistic/PieChartContainer";
import StatisticTableContainer from "../components/statistic/StatisticTableContainer";

const Statistic = () => {
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
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          {/* <StreamChartContainer xs={12} md={7} lg={7} /> */}
          <PieChartContainer xs={12} md={12} lg={12} />
        </Grid>
      </Box>
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          <StatisticTableContainer xs={12} md={7} lg={7} />
          <BarChartContainer
            xs={12}
            md={5}
            lg={5}
            sx={{ position: "relative", top: -55 }}
          />
        </Grid>
      </Box>
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          <LineChartContainer
            xs
            md
            lg
            sx={{ position: "relative", top: -55 }}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistic;
