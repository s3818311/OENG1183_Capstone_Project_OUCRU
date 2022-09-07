import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ResponsivePie } from "@nivo/pie";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const PieTitle = (props) => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      {props.title}
    </Typography>
  );
};

const StatisticPieChart = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    const landCoverColor = {
      water: "#419bdf",
      trees: "#397d49",
      grass: "#88b053",
      flooded_vegetation: "#7a87c6",
      crops: "#e49635",
      shrub_and_scrub: "#d4c35a",
      built: "#c4281b",
      bare: "#a59b8f",
    };

    let processedData = [];

    let landCoverTitle = Object.keys(data);
    let landCoverValue = Object.values(data);
    landCoverTitle.shift();
    landCoverValue.shift();

    let total_landcover = landCoverValue.reduce((total, cur) => {
      return total + cur;
    }, 0);

    for (let i = 0; i < landCoverTitle.length; i++) {
      let mockData = {};
      mockData["id"] = landCoverTitle[i];
      mockData["label"] = landCoverTitle[i];
      mockData["value"] = landCoverValue[i] / total_landcover;
      mockData["color"] = landCoverColor[landCoverTitle[i]];

      processedData.push(mockData);
    }

    setData(processedData);
  }, []);

  return (
    <ResponsivePie
      data={data}
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
};
const PieChartContainer = (props) => {
  const [landCoverData, setLandCoverData] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchLandCoverData() {
      setBusy(true);
      const res = await fetch("http://3.80.95.119:9000/landcover");
      const json = await res.json();

      setLandCoverData(json);
      setBusy(false);
    }

    fetchLandCoverData();
  }, []);

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      {isBusy ? (
        <Grid>
          <Grid container sx={{ width: "100%", justifyContent: "center" }}>
            <CircularProgress size={"10rem"} />
          </Grid>
        </Grid>
      ) : (
        <Grid>
          {landCoverData &&
            landCoverData.map((yearlyData, index) => (
              <Paper
                sx={{
                  p: 2,
                  height: 600,
                  mb: 5,
                }}
              >
                <PieTitle
                  title={`Ho Chi Minh City land cover distribution (${yearlyData.date})`}
                />

                <StatisticPieChart data={yearlyData} index={index} />
              </Paper>
            ))}
        </Grid>
      )}
    </Grid>
  );
};

export default PieChartContainer;
