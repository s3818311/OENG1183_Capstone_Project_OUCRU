import React from "react";
import "../../styles/landing/header.css";
import lab from "../../assets/landing/lab.avif";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const styles = {
  heroContainer: {
    height: "100vh",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lab})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    zIndex: -1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {},
};

const Header = () => {
  return (
    <Grid
      container
      sx={{
        mt: 8,
      }}
    >
      <Box sx={styles.heroContainer}>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 400,
            fontStyle: "italic",
            color: "white",
          }}
        >
          A modern IT solution for dengue virus outbreak management
        </Typography>
        <Typography
          sx={{
            mt: 2,
            fontSize: 20,
            fontweight: 700,
            color: "white",
          }}
        >
          Partnership with <b>OUCRU</b>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Header;
