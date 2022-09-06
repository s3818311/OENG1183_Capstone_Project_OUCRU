import React, { lazy } from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "../enums/routes.js";

const Overview = lazy(() => import("../views/dashboard/Overview.js"));
const Statistic = lazy(() => import("../views/dashboard/Statistic.js"));
const Query = lazy(() => import("../views/dashboard/Query.js"));
const Guide= lazy(() => import("../views/dashboard/Guide.js"));

const DashboardRoutes = [
  <Route exact path={ROUTES.DASHBOARD.OVERVIEW} element={<Overview />} />,
  <Route exact path={ROUTES.DASHBOARD.STATISTIC} element={<Statistic />} />,
  <Route exact path={ROUTES.DASHBOARD.QUERY} element={<Query />} />,
  <Route exact path={ROUTES.DASHBOARD.GUIDE} element={<Guide />} />,
];

export default DashboardRoutes;
