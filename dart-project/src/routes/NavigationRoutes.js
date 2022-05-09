import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Overview = lazy(() => import("../views/Overview.js"));
const Statistic = lazy(() => import("../views/Statistic.js"));
const View3 = lazy(() => import("../views/View3.js"));

const NavigationRoutes = [
  <Route exact path="/" element={<Overview />} />,
  <Route exact path="/statistic" element={<Statistic />} />,
  <Route exact path="/view3" element={<View3 />} />,
];

export default NavigationRoutes;
