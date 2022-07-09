import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../enums/routes.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { localStorageUtil } from "../../utils/localStorageUtil";
import * as STORAGE from "../../enums/localStorage";
import { AccountContext } from "../../utils/accountUtil";
import { useNavigate } from "react-router-dom";

const DASHBOARD_ROUTE = "/dashboard/" + ROUTES.DASHBOARD.OVERVIEW;

function LoginOrLogoutButton() {
  const [status, setStatus] = useState(false);
  let navigate = useNavigate();

  const { getSession, leaveSession } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  });

  const handleLogin = () => {
    navigate(ROUTES.PORTAL.SIGNIN);
  };

  const handleLogout = () => {
    leaveSession();
    setStatus(false);
  };

  return (
    <Box>
      {!status ? (
        <Button onClick={handleLogin}>Login </Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </Box>
  );
}

function LandingPage() {
  useEffect(() => {
    localStorageUtil.setStorageItem(
      STORAGE.PAGE_TO_NAVIGATE_BACK,
      STORAGE.LANDING_PAGE
    );
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h2>LANDING PAGE </h2>
      <RouterLink to={DASHBOARD_ROUTE}>
        Click here to go to dashboard
      </RouterLink>

      <LoginOrLogoutButton />
    </Box>
  );
}

export default LandingPage;
