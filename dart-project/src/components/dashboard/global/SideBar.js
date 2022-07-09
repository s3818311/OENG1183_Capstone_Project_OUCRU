import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  mainListItems,
  secondaryListItems,
  homeListItem,
} from "../barItems/sidebar/ListItems";
import Drawer from "../barItems/sidebar/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VaccinesIcon from "@mui/icons-material/Vaccines";

const SideBar = (props) => {
  return (
    <Drawer variant="permanent" open={props.open}>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: [1],
          }}
        >
          <IconButton onClick={props.toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Toolbar
          sx={{
            px: [1],
            position: "relative",
            right: 35,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              border: "3px solid rgb(25,118,210)",
              borderRadius: 3,
              mx: [2],
            }}
          >
            <IconButton>
              <VaccinesIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontSize: 25, color: "rgb(25,118,210)", fontWeight: 700 }}
          >
            DART
          </Typography>
        </Toolbar>
      </Box>

      <Divider />
      <List aria-label="main">{mainListItems}</List>
      <Divider />
      <List aria-label="secondary">{secondaryListItems}</List>
      <Divider />
      <List
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
        aria-label="secondary"
      >
        {homeListItem}
      </List>
    </Drawer>
  );
};

export default SideBar;
