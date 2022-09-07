import { ResponsiveLine } from "@nivo/line";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

import districtsWards from "../../../tempdata/districts_wards";

const LineTitle = () => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      January to February 2020 rainfall estimates for HCMC districts (mm)
    </Typography>
  );
};

const StatisticLineChart = (props) => {
  const [rawData, setData] = useState(props.data);
  const districts = Object.keys(districtsWards);

  useEffect(() => {
    let processedData = [];

    for (let i = 0; i < districts.length; i++) {
      const normalized_dis = districts[i]
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace("Đ", "D")
        .replace(" ", "");
      let cur_d = {
        id: districts[i],
        data: rawData.map((day) => ({
          x: day["date"].replace(/\./g, "-"),
          y: parseFloat(day[`${normalized_dis}_avg`]).toFixed(2),
        })),
      };

      processedData.push(cur_d);
    }

    console.log(processedData);

    setData(processedData);
  }, []);

  return (
    <ResponsiveLine
      data={rawData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        stacked: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 month",
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
      curve="linear"
    />
  );
};

const LineChartContainer = (props) => {
  const [chirpsData, setChirpsData] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchChirpsData() {
      setBusy(true);
      const res = await fetch("https://digital-market-app.link/chirps");
      const json = await res.json();

      setChirpsData(json);
      setBusy(false);
    }

    fetchChirpsData();
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
        <Paper
          sx={{
            p: 2,
            height: 600,
          }}
        >
          <LineTitle />
          <StatisticLineChart data={chirpsData} />
        </Paper>
      )}
    </Grid>
  );
};

export default LineChartContainer;
