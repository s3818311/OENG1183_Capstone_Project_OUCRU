import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const WhatIsApp = () => (
  <Grid
    container
    spacing={2}
    sx={{
      margin: "0 auto",
      width: "65%",
      mt: 10,
    }}
  >
    <Box>
      <Typography
        sx={{
          background:
            "linear-gradient(90deg, rgba(40, 74, 255, 1) 0%, rgba(18, 30, 33, 1) 100%);",
          backgroundClip: "text",
          color: "transparent",
          fontSize: { xs: 30, md: 40, lg: 50 },
          fontWeight: 700,
          lineHeight: { xs: "42px", md: "52px", lg: "75px" },
        }}
      >
        DART - Dengue Advanced Readiness Tool
      </Typography>
      <Divider
        variant="left"
        sx={{
          width: "5%",
          mt: 1,
          borderBottomWidth: 5,
          background: "rgb(255,138,113)",
        }}
      />
      <Typography
        sx={{
          mt: 5,
          fontSize: { xs: 20, md: 23, lg: 25 },
          fontWeight: 400,
          color: "rgba(0,0,0,0.7)",
          textAlign: "left",
        }}
      >
        DART is an open-source project to accomplish its assignment as one of
        the pioneered dengue forecasting tools in Vietnam, in collaboration with
        the Oxford University Clinical Research Unit (OUCRU). The system
        integrates multiple high-resolution data sources including
        entomological, environmental, human demographic, socio-economic and
        behavioural and intervention data with epidemiological and
        meteorological modelling to develope a dengue outbreak foredcasting
        tool.
        <br />
        <br />
        We provide a continually-updated view of publicly available data
        alongside with real time statistical analysis and powerful visualization
        tools for use by the community. The tool will deliver time-critical
        information directly to all target audiences ranging from citizens andto
        pocliy makers and health professionals with forecasts over short time.
        <br />
        <br />
        As such, it aids local Vietnamese people at any knowledge level to have
        better epidemiological understanding and enables local authorities to
        have better awareness of dengue for further prevention strategies, hence
        lowering dengue cases. response.
      </Typography>
    </Box>
  </Grid>
);

export default WhatIsApp;
