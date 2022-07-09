import React from "react";
import SigninForm from "../../components/portal/SigninForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const mdTheme = createTheme();

const Signin = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Grid
        container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SigninForm />
      </Grid>
    </ThemeProvider>
  );
};

export default Signin;
