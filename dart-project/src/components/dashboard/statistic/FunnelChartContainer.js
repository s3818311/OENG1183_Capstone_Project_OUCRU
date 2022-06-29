import { ResponsiveFunnel } from "@nivo/funnel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const funnelData = require("../../../tempdata/elevation_pct.json");

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

const FunnelChart = () => (
  <ResponsiveFunnel
    data={funnelData}
    margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
    interpolation="linear"
    shapeBlending={0.65}
    valueFormat=" >-.4%"
    colors={{ scheme: "brown_blueGreen" }}
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

const FunnelChartContainer = (props) => {
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg} sx={props.sx}>
      <Paper
        sx={{
          p: 2,
          height: 1200,
        }}
      >
        <FunnelTitle />
        <FunnelChart />
      </Paper>
    </Grid>
  );
};

export default FunnelChartContainer;
