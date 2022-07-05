import React, { lazy } from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "../enums/routes.js";

const LandingPage = lazy(() => import("../views/landing/LandingPage.js"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard.js"));
const Portal = lazy(() => import("../views/portal/Portal.js"));

const NavigationRoutes = [
  <Route exact path={ROUTES.DEFAULT} element={<LandingPage />} />,
  <Route exact path={ROUTES.DASHBOARD.DEFAULT} element={<Dashboard />} />,
  <Route exact path={ROUTES.PORTAL.DEFAULT} element={<Portal />} />,
];

export default NavigationRoutes;
