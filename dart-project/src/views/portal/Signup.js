import React from "react";
import SignupForm from "../../components/portal/SignupForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const mdTheme = createTheme();

const Signup = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Grid
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignupForm />
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
