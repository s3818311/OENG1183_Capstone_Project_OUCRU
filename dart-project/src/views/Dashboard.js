import * as React from "react";
import { useState, useLayoutEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TopBar from "../components/global/TopBar";
import SideBar from "../components/global/SideBar";
import { Suspense } from "react";
import { Routes, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import PropTypes from "prop-types";
import NavigationRoutes from "../routes/NavigationRoutes";
import * as BROWSER from "../enums/browser.js";

const mdTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 23,
          fontWeight: 600,
        },
      },
    },
  },
});

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function DashboardContent() {
  let [open] = useState(true);
  let [previousOpen] = useState(open);
  let [menuDisabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [width] = useWindowSize();

  // width: 1200
  if (width < BROWSER.SIZE.HIGHER_BREAKPOINT + 400) {
    open = false;
    menuDisabled = true;
  } else {
    menuDisabled = false;
    if (clicked) {
      open = !open;
    } else {
      open = previousOpen;
    }
  }

  const toggleDrawer = () => {
    if (width > BROWSER.SIZE.HIGHER_BREAKPOINT) {
      setClicked(!clicked);
      open = !open;
      previousOpen = open;
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          open={open}
          toggleDrawer={toggleDrawer}
          disabled={menuDisabled}
        />

        <Suspense fallback={<div></div>}>
          <Router>
            <SideBar open={open} toggleDrawer={toggleDrawer} />
            <Routes>{NavigationRoutes}</Routes>
          </Router>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
