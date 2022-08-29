import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ResponsivePie } from "@nivo/pie";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

// const pieData = require("../../../tempdata/pie_pct.json");

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

async function getLandCoverData() {
  try {
    let response = await fetch("http://localhost:9000/landcover");
    return await response.json();
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

const PieTitle = () => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      Ho Chi Minh City land cover distribution
    </Typography>
  );
};

const StatisticPieChart = (props) => (
  <ResponsivePie
    data={props.data}
    margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
    colors={{ datum: "data.color" }}
    valueFormat=" >-.4%"
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[]}
    legends={[
      {
        anchor: "left",
        direction: "column",
        justify: false,
        translateX: 20,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

const PieChartContainer = (props) => {
  const [landCoverData, setLandCoverData] = useState([{}]);

  useEffect(() => {
    getLandCoverData().then((data) => {
      let processedData = [];
      data = data[0];
      let landCoverTitle = Object.keys(data);
      let landCoverValue = Object.values(data);
      landCoverTitle.shift();
      landCoverValue.shift();

      // console.log("test:" + landCoverTitle);

      let total_landcover = landCoverValue.reduce((total, cur) => {
        return total + cur;
      }, 0);

      for (let i = 0; i < landCoverTitle.length; i++) {
        let mockData = {};
        mockData["id"] = landCoverTitle[i];
        mockData["label"] = landCoverTitle[i];
        mockData["value"] = landCoverValue[i] / total_landcover;
        mockData["color"] = `hsl(${randomNum(0, 360)}, ${randomNum(
          0,
          100
        )}%, ${randomNum(0, 100)}%)`;

        processedData.push(mockData);
      }

      console.log(processedData);

      setLandCoverData(processedData);
    });
  }, []);

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 600,
        }}
      >
        <PieTitle />
        <StatisticPieChart data={landCoverData} />
      </Paper>
    </Grid>
  );
};

export default PieChartContainer;
