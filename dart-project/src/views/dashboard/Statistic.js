import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import LineChartContainer from "../../components/dashboard/statistic/LineChartContainer";
import FunnelChartContainer from "../../components/dashboard/statistic/FunnelChartContainer.js";
import PieChartContainer from "../../components/dashboard/statistic/PieChartContainer";

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
          <LineChartContainer xs md lg />
        </Grid>
      </Box>
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          <PieChartContainer xs={12} md={12} lg={12} />
        </Grid>
      </Box>
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Grid container spacing={2}>
          <FunnelChartContainer xs={12} md={12} lg={12} />
        </Grid>
      </Box>
    </Box>
  );
};

export default Statistic;
