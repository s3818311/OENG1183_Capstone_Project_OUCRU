import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Overview = lazy(() => import("../views/Overview.js"));
const View2 = lazy(() => import("../views/View2.js"));
const View3 = lazy(() => import("../views/View3.js"));

const navigationRoutes = [
  <Route exact path="/" element={<Overview />} />,
  <Route exact path="/view2" element={<View2 />} />,
  <Route exact path="/view3" element={<View3 />} />,
];

export default navigationRoutes;
