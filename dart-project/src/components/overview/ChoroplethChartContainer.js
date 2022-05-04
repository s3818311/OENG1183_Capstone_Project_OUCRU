import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ResponsiveChoropleth } from "@nivo/geo";

const choroplethData = require("../../tempdata/choropleth.json");
const features = require("../../tempdata/world_countries.json")["features"];

console.log(features);
const OverviewChoropleth = () => (
  <ResponsiveChoropleth
    data={choroplethData}
    features={features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 1000000]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const ChoroplethChartContainer = (props) => {
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg}>
      <Paper
        sx={{
          p: 2,
          height: 600,
        }}
      >
        <OverviewChoropleth />
      </Paper>
    </Grid>
  );
};

export default ChoroplethChartContainer;
