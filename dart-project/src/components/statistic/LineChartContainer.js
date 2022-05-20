import { ResponsiveLine } from "@nivo/line";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const lineData = require("../../tempdata/line.json");

const StatisticLineChart = () => (
  <ResponsiveLine
    data={lineData}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Month",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Rainfall (mm)",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    legends={[
      {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    lineWidth={3}
    pointSize={7}
    pointColor={{ theme: "background" }}
    pointBorderWidth={3}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    enableGridX={false}
    curve="monotoneX"
  />
);

const LineTitle = () => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      2020 rainfall estimates for HCMC districts (mm)
    </Typography>
  );
};

const LineChartContainer = (props) => {
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 600,
        }}
      >
        <LineTitle />
        <StatisticLineChart />
      </Paper>
    </Grid>
  );
};

export default LineChartContainer;
