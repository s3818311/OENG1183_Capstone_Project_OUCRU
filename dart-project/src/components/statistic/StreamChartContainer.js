import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ResponsiveStream } from "@nivo/stream";
import Typography from "@mui/material/Typography";

const streamData = require("../../tempdata/stream.json");

const StreamTitle = () => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      Stream Chart Title
    </Typography>
  );
};

const StatisticStreamChart = () => (
  <ResponsiveStream
    data={streamData}
    keys={["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 36,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    offsetType="silhouette"
    colors={{ scheme: "nivo" }}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#2c998f",
        size: 4,
        padding: 2,
        stagger: true,
      },
      {
        id: "squares",
        type: "patternSquares",
        background: "inherit",
        color: "#e4c912",
        size: 6,
        padding: 2,
        stagger: true,
      },
    ]}
    fill={[
      {
        match: {
          id: "Paul",
        },
        id: "dots",
      },
      {
        match: {
          id: "Marcel",
        },
        id: "squares",
      },
    ]}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{
      from: "color",
      modifiers: [["darker", 0.7]],
    }}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        translateX: 100,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
            },
          },
        ],
      },
    ]}
  />
);

const StreamChartContainer = (props) => {
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 650,
        }}
      >
        <StreamTitle />
        <StatisticStreamChart />
      </Paper>
    </Grid>
  );
};

export default StreamChartContainer;
