import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../enums/routes.js";

const DASHBOARD_ROUTE = "/dashboard/" + ROUTES.LINK.DASHBOARD_OVERVIEW;

const LandingPage = () => {
  return (
    <div>
      <h2>LANDING PAGE </h2>
      <RouterLink to={DASHBOARD_ROUTE}>
        Click here to go to dashboard
      </RouterLink>
    </div>
  );
};

export default LandingPage;
