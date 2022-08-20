import React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { localStorageUtil } from "../../utils/localStorageUtil";
import * as STORAGE from "../../enums/localStorage";
import Footer from "../../components/landing/Footer.js";
import Blog from "../../components/landing/Blog.js";
import Possibility from "../../components/landing/Possibility.js";
import Header from "../../components/landing/Header.js";
import WhatIsApp from "../../components/landing/WhatIsApp.js";
import NavBar from "../../components/landing/NavBar.js";
import Dengue from "../../components/landing/Dengue.js";
import DengueSymptoms from "../../components/landing/DengueSymptoms.js";
import DashboardIntro from "../../components/landing/DashboardIntro.js";
import Overview from "../../components/landing/Overview.js";
import "../../styles/landing/landing.css";

function LandingPage() {
  useEffect(() => {
    localStorageUtil.setStorageItem(
      STORAGE.PAGE_TO_NAVIGATE_BACK,
      STORAGE.LANDING_PAGE
    );
  }, []);

  return (
    <Box>
      <NavBar />
      <Header />
      <WhatIsApp />
      <Dengue />
      <DengueSymptoms />
      <DashboardIntro />
      <Overview />
      <Blog />
      <Possibility />
      <Footer />
    </Box>
  );
}

export default LandingPage;
