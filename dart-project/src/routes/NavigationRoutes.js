import React, { lazy } from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "../enums/routes.js";

const LandingPage = lazy(() => import("../views/landing/LandingPage.js"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard.js"));

const NavigationRoutes = [
  <Route exact path={ROUTES.LINK.DEFAULT} element={<LandingPage />} />,
  <Route exact path={ROUTES.LINK.DASHBOARD} element={<Dashboard />} />,
];

export default NavigationRoutes;
