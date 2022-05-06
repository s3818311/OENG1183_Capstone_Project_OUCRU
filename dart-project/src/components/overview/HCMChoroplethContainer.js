import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Choropleth } from "@nivo/geo";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import BaseDatepicker from "../base/BaseDatepicker";

const hcmc_data = require("../../tempdata/hcmc_data.json");
const hcmc_features = require("../../tempdata/hcmc_feature.json")["features"];

/*---------------------------------------------------------------------------*/
setTimeout(() => {
  const choroplethSVG = document.querySelectorAll(
    "svg[xmlns='http://www.w3.org/2000/svg']"
  )[2];
  const choroplethSVGParent = choroplethSVG.parentElement;
  const choroplethSVGContainer = document.querySelectorAll(
    ".MuiGrid-root.MuiGrid-item"
  )[2];

  choroplethSVGContainer.style.minWidth = "1600px";
  var viewBox = {
    x: 0,
    y: 0,
    w: choroplethSVG.clientWidth,
    h: choroplethSVG.clientHeight,
  };
  choroplethSVG.setAttribute(
    "viewBox",
    `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
  );
  const svgSize = {
    w: choroplethSVG.clientWidth,
    h: choroplethSVG.clientHeight,
  };
  var isPanning = false;
  var startPoint = { x: 0, y: 0 };
  var endPoint = { x: 0, y: 0 };
  var scale = 1;

  /* ***************************************************** */
  // ***MAP RESIZING (SCROLLING)***
  choroplethSVGParent.onmousewheel = function (e) {
    e.preventDefault();
    var w = viewBox.w;
    var h = viewBox.h;
    var mx = e.offsetX; //mouse x
    var my = e.offsetY;
    var dw = w * Math.sign(e.deltaY) * 0.05;
    var dh = h * Math.sign(e.deltaY) * 0.05;
    var dx = (dw * mx) / svgSize.w;
    var dy = (dh * my) / svgSize.h;
    viewBox = {
      x: viewBox.x - dx,
      y: viewBox.y - dy,
      w: viewBox.w + dw,
      h: viewBox.h + dh,
    };

    scale = svgSize.w / viewBox.w;
    choroplethSVG.setAttribute(
      "viewBox",
      `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
    );
  };
  /* ***************************************************** */
  // ***MAP DRAGGING***
  choroplethSVGParent.onmousedown = function (e) {
    isPanning = true;
    startPoint = { x: e.x, y: e.y };
  };

  choroplethSVGParent.onmousemove = function (e) {
    if (isPanning) {
      endPoint = { x: e.x, y: e.y };
      var dx = (startPoint.x - endPoint.x) / scale;
      var dy = (startPoint.y - endPoint.y) / scale;
      var movedViewBox = {
        x: viewBox.x + dx,
        y: viewBox.y + dy,
        w: viewBox.w,
        h: viewBox.h,
      };
      choroplethSVG.setAttribute(
        "viewBox",
        `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
      );
    }
  };

  choroplethSVGParent.onmouseup = function (e) {
    if (isPanning) {
      endPoint = { x: e.x, y: e.y };
      var dx = (startPoint.x - endPoint.x) / scale;
      var dy = (startPoint.y - endPoint.y) / scale;
      viewBox = {
        x: viewBox.x + dx,
        y: viewBox.y + dy,
        w: viewBox.w,
        h: viewBox.h,
      };
      choroplethSVG.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
      );
      isPanning = false;
    }
  };

  choroplethSVGParent.onmouseleave = function (e) {
    isPanning = false;
  };
}, 500);

/*-------------------------------------------------------------------------- */

function ChoroplethFilterAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => (e, isExpanded) => {
    if (isExpanded) {
      setExpanded(true);
      const data = { height: 650, width: 10 };
      props.receiveChoroplethHeight(data);
    } else {
      setExpanded(false);
      const data = { height: 745, width: 20 };
      props.receiveChoroplethHeight(data);
    }
  };

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg}>
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              width: "38%",
              flexShrink: 0,
              fontSize: 19,
              color: "text.secondary",
            }}
          >
            Advanced Filtering
          </Typography>
          <Typography sx={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            Ho Chi Minh City Choropleth Map
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BaseDatepicker label="From" />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

function OverviewHCMChoropleth(props) {
  return (
    <Choropleth
      width={1600}
      height={props.height}
      id="overview-choropleth"
      data={hcmc_data}
      features={hcmc_features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="nivo"
      domain={[0, 0.00906865]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionTranslation={[-48.4, 10.65]}
      projectionRotation={[0, 0, 0]}
      projectionScale={42000}
      enableGraticule={false}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#152538"
    />
  );
}

function HCMChoroplethContainer(props) {
  const [choroplethHeight, setChoroplethHeight] = React.useState(745);

  const receiveChoroplethHeight = (data) => {
    setChoroplethHeight(data.height);
  };

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg}>
      <Paper
        sx={{
          height: 800,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChoroplethFilterAccordion
          receiveChoroplethHeight={receiveChoroplethHeight}
        />
        <OverviewHCMChoropleth height={choroplethHeight} />
      </Paper>
    </Grid>
  );
}

export default HCMChoroplethContainer;
