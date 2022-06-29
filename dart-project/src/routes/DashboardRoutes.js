import React, { lazy } from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "../enums/routes.js";

const Overview = lazy(() => import("../views/dashboard/Overview.js"));
const Statistic = lazy(() => import("../views/dashboard/Statistic.js"));
const Guide = lazy(() => import("../views/dashboard/Guide.js"));

const DashboardRoutes = [
  <Route exact path={ROUTES.LINK.DASHBOARD_OVERVIEW} element={<Overview />} />,
  <Route
    exact
    path={ROUTES.LINK.DASHBOARD_STATISTIC}
    element={<Statistic />}
  />,
  <Route exact path={ROUTES.LINK.DASHBOARD_GUIDE} element={<Guide />} />,
];

export default DashboardRoutes;
