import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../../utils/accountUtil";
import logo from "../../dart_proj.svg";
import AccountButton from "../shared/AccountButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  const [status, setStatus] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255,255,255, 0.9)",
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={logo}
            sx={{ width: "50px", height: "50px", mr: 2 }}
          ></Box>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black", fontWeight: 800, fontSize: 23 }}
          >
            DART
          </Typography>
          <AccountButton status={status} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
