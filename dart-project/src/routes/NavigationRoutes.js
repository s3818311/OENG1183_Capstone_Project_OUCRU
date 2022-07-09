import React, { lazy } from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "../enums/routes.js";

const LandingPage = lazy(() => import("../views/landing/LandingPage.js"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard.js"));
const Signin = lazy(() => import("../views/portal/Signin.js"));
const Signup = lazy(() => import("../views/portal/Signup.js"));

const NavigationRoutes = [
  <Route exact path={ROUTES.DEFAULT} element={<LandingPage />} />,
  <Route exact path={ROUTES.DASHBOARD.DEFAULT} element={<Dashboard />} />,
  <Route exact path={ROUTES.PORTAL.SIGNIN} element={<Signin />} />,
  <Route exact path={ROUTES.PORTAL.SIGNUP} element={<Signup />} />,
];

export default NavigationRoutes;
