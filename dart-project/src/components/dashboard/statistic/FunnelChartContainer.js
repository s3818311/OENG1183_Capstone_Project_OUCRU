import { ResponsiveFunnel } from "@nivo/funnel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const FunnelTitle = () => {
  return (
    <Typography
      variant="h6"
      color="black"
      align="center"
      sx={{ marginTop: 1, marginBottom: -5 }}
    >
      Ho Chi Minh City elevation distribution (m)
    </Typography>
  );
};

const FunnelChart = (props) => (
  <ResponsiveFunnel
    data={props.data}
    margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
    interpolation="linear"
    shapeBlending={0.65}
    valueFormat=" >-.4s"
    colors={{ scheme: "spectral" }}
    borderWidth={4}
    borderColor="black"
    borderOpacity={1}
    enableLabel={false}
    beforeSeparatorLength={20}
    afterSeparatorLength={20}
    currentPartSizeExtension={10}
    currentBorderWidth={5}
    motionConfig="gentle"
  />
);
async function getElevationData() {
  try {
    let response = await fetch("http://localhost:9000/elevation");
    return await response.json();
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

const FunnelChartContainer = (props) => {
  const [elevationData, setElevationData] = useState([{}]);

  useEffect(() => {
    getElevationData().then((data) => {
      let processedData = [];

      data.forEach((element) => {
        let mockData = {
          id: element.elevation,
          label: `${element.elevation} m`,
          value: element.count,
        };

        processedData.push(mockData);
      });
      setElevationData(processedData);
    });
  }, []);

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 1200,
        }}
      >
        <FunnelTitle />
        <FunnelChart data={elevationData} />
      </Paper>
    </Grid>
  );
};

export default FunnelChartContainer;
