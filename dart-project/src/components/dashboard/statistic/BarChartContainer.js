import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ResponsiveBar } from "@nivo/bar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const BarTitle = () => {
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

const StatisticBarChart = (props) => (
  <ResponsiveBar
    data={props.data}
    keys={props.keys}
    indexBy="date"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "date",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "land cover",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
  />
);

async function getLandCoverData() {
  try {
    let response = await fetch("http://3.80.95.119:9000/landcover");
    return await response.json();
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

const BarChartContainer = (props) => {
  const [landCoverData, setLandCoverData] = useState([{}]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    getLandCoverData().then((data) => {
      let processedData = [];
      data.forEach((element) => {
        let landCoverTitles = Object.keys(element);
        let landCoverValues = Object.values(element);
        landCoverTitles.shift();
        landCoverValues.shift();

        setKeys(landCoverTitles);
        let mockData = {
          date: element.date,
        };
        for (let i = 0; i < landCoverTitles.length; i++) {
          mockData[landCoverTitles[i]] = landCoverValues[i];
          mockData[`${landCoverTitles[i]}Color`] = `hsl(${randomNum(
            0,
            360
          )}, ${randomNum(0, 100)}%, ${randomNum(0, 100)}%)`;
        }
        processedData.push(mockData);
      });

      console.log("hi");
      console.log(processedData);

      setLandCoverData(processedData);
    });
  }, []);
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 1000,
        }}
      >
        <BarTitle />
        <StatisticBarChart data={landCoverData} keys={keys} />
      </Paper>
    </Grid>
  );
};

export default BarChartContainer;
