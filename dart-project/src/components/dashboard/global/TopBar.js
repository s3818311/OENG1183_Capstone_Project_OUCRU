import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "../barItems/topbar/AppBar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountContext } from "../../../utils/accountUtil";
import React, { useState, useContext, useEffect } from "react";
import AccountButton from "../../shared/AccountButton";

function TopBar(props) {
  const [status, setStatus] = useState(false);

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  });

  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(props.open && { display: "none" }),
            ...(props.disabled && { pointerEvents: "none", color: "#e0e0e0" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h1"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>

        <Tooltip title="Notifications">
          <IconButton color="inherit" sx={{ me: 5 }}>
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <AccountButton status={status} />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
