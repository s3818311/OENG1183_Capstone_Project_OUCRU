import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dengue = () => (
  <Grid
    container
    spacing={2}
    sx={{
      width: "100%",
      backgroundColor: "rgb(255,245,204)",
      margin: "0 auto",
      mt: 10,
      py: 15,
    }}
  >
    <Grid
      container
      xs={12}
      md={5}
      lg={5}
      sx={{
        alignItems: "center",
        justifyContent: { xs: "center" },
      }}
    >
      <Typography
        sx={{
          ml: { xs: 0, md: 10, lg: 15 },
          fontSize: { xs: 40, md: 55, lg: 60 },
          fontWeight: 700,
          color: "black",
          mr: { lg: 7 },
        }}
      >
        What is Dengue?
      </Typography>
    </Grid>
    <Grid container xs={12} md={7} lg={7} sx={{}}>
      <Typography
        sx={{
          fontSize: { xs: 18, md: 20, lg: 23 },
          fontWeight: 400,
          color: "black",
          mr: { lg: 15, md: 10 },
          mx: { xs: 5 },
          mt: { xs: 5 },
        }}
      >
        Dengue is an arboviral infection spread by mosquitoes that causes a
        severe flu-like disease and, in rare cases, fatal complications, which
        is ranked <b>9th</b> in top 10 global health threats by the
        <b>
          <i>World Health Organization (WHO)</i>
        </b>{" "}
        because of its rapid global expansion, lack of therapeutic options, and
        ineffective vaccines. The infection is widespread throughout the
        tropics, with local variations in risk influenced by climate parameters
        as well as social and environmental factors.
        <br />
        <br />
        In Vietnam, dengue is recognized as a major cause of mortality and
        morbidity. The fever is hyperendemic in southern Vietnam, peaking in the
        rainy season (May-November), and has been emerging in northern Vietnam
        for 20 years, with seasonal transmission peaks in the fall
        (September-November) and significant year-to-year variability in
        outbreak severity.
      </Typography>
    </Grid>
  </Grid>
);

export default Dengue;
