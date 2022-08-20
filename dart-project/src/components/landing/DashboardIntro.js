import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import dashboardIntro from "../../assets/landing/dashboard-intro.jfif";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../enums/routes.js";

const DASHBOARD_ROUTE = "/dashboard/" + ROUTES.DASHBOARD.OVERVIEW;

const StyledButton = styled(Button)({
  "&.MuiButton-root": {
    backgroundColor: "rgb(255,245,201)",
    color: "black",
    borderRadius: 20,
    width: "30%",
    height: 50,
    "&:hover": {
      backgroundColor: "#ffe135",
    },
  },
});

const InteractiveIcon = () => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "rgb(255,245,204)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          width: 60,
          height: 60,
          color: "black",
        }}
      >
        <TouchAppIcon fontSize="large" />
      </Avatar>
      <Typography
        sx={{
          color: "rgb(255,245,204)",
          mt: 2,
          fontWeight: 500,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Fully interactive
      </Typography>
    </Grid>
  );
};

const CustomizeIcon = () => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "rgb(255,245,204)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          width: 60,
          height: 60,
          color: "black",
        }}
      >
        <SettingsIcon fontSize="large" />
      </Avatar>
      <Typography
        sx={{
          color: "rgb(255,245,204)",
          mt: 2,
          fontWeight: 500,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Fully customizable
      </Typography>
    </Grid>
  );
};

const RasterMapIcon = () => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "rgb(255,245,204)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          width: 60,
          height: 60,
          color: "black",
        }}
      >
        <MapIcon fontSize="large" />
      </Avatar>
      <Typography
        sx={{
          color: "rgb(255,245,204)",
          mt: 2,
          fontWeight: 500,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Map visualisation
      </Typography>
    </Grid>
  );
};
const DashboardIntro = () => (
  <Grid
    container
    spacing={2}
    sx={{
      width: "100%",
      backgroundColor: "rgba(26,116,211,0.8)",
      margin: "0 auto",
      mt: 10,
      py: 15,
      flexDirection: { xs: "column-reverse", md: "row", lg: "row" },
    }}
  >
    <Grid
      container
      xs={12}
      md={6}
      lg={6}
      sx={{
        alignItems: "center",
        justifyContent: { xs: "center" },
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 30, md: 45, lg: 55 },
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          width: { xs: "100%", md: "90%", lg: "95%" },
        }}
      >
        Visualisation Dashboard
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 18, md: 20, lg: 22 },
          fontWeight: 500,
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
          mt: 2,
          mb: 5,
        }}
      >
        For professionals
      </Typography>
      <Grid
        container
        sx={{
          flexDirection: "row",
          width: { xs: "90%", md: "100%", lg: "80%" },
          margin: "0 auto",
          mb: 5,
        }}
      >
        <InteractiveIcon />
        <CustomizeIcon />
        <RasterMapIcon />
      </Grid>
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18, lg: 20 },
          fontWeight: 400,
          color: "white",
          textAlign: "center",
          width: "80%",
          margin: "0 auto",
          mb: 5,
        }}
      >
        Advanced, interactive data visualization tool that tracks, analyzes and
        displays key metrics across different datasets in real-time. Clinicians,
        healthcare providers and scientists can make conclusions on future
        courses of action for dengue outbreak management.
      </Typography>
      <StyledButton>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {" "}
          <RouterLink to={DASHBOARD_ROUTE}>Try now</RouterLink>
        </Typography>
      </StyledButton>
    </Grid>
    <Grid
      container
      xs={12}
      md={6}
      lg={6}
      sx={{
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={dashboardIntro}
        sx={{
          borderRadius: 5,
          boxShadow: 10,
          width: { xs: "80%", md: "unset", lg: "unset" },
          height: "auto",
          margin: "0 auto",
          mb: { xs: 5 },
        }}
      />
    </Grid>
  </Grid>
);

export default DashboardIntro;
