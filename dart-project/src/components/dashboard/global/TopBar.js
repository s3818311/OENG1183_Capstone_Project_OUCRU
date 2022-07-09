import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "../barItems/topbar/AppBar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { AccountContext } from "../../../utils/accountUtil";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../../enums/routes";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [preferredUsername, setPreferredUsername] = useState("");
  const [email, setEmail] = useState("");

  const open = Boolean(anchorEl);

  let navigate = useNavigate();

  const { leaveSession, getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((data) => {
        const payload = data.idToken.payload;
        const preferred_username = payload.preferred_username;
        const email = payload.email;

        setPreferredUsername(preferred_username);
        setEmail(email);
      })
      .catch((err) => {
        // do nothing
      });
  });

  const handleOpenAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    leaveSession();
    navigate(ROUTES.DEFAULT);
  };

  return (
    <div>
      <Tooltip title="Account Settings">
        <IconButton
          size="large"
          aria-label="User Account"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          color="inherit"
          onClick={handleOpenAccountMenu}
          sx={{ ml: "5px" }}
        >
          <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
            {preferredUsername.slice(0, 1)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseAccountMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ pointerEvents: "none" }}>
          <Avatar sx={{ width: 32, height: 32, textTransform: "uppercase" }}>
            {preferredUsername.slice(0, 1)}
          </Avatar>{" "}
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            {preferredUsername}
          </Typography>
        </MenuItem>
        <MenuItem sx={{ pointerEvents: "none" }}>({email})</MenuItem>
        <Divider />

        <MenuItem onClick={handleCloseAccountMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

const CustomLoginButton = styled(Button)(({ theme }) => ({
  color: "rgb(25,118,210)",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: grey[100],
  },
}));

function LoginButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.PORTAL.SIGNIN);
  };
  return (
    <CustomLoginButton
      id="dashboard-login-button"
      variant="contained"
      onClick={handleClick}
      sx={{ ml: "20px" }}
      size="large"
      startIcon={<LoginIcon />}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "15px" }}>
        Login
      </Typography>
    </CustomLoginButton>
  );
}

const LoginOrAccountButton = (props) => {
  if (props.status) {
    return <AccountMenu />;
  } else {
    return <LoginButton />;
  }
};

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
        <LoginOrAccountButton status={status} />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
