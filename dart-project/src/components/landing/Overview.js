import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ResponsiveCalendar, CalendarCanvas } from "@nivo/calendar";
import { generateDayCounts } from "@nivo/generators";
import { ResponsiveBar } from "@nivo/bar";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { dateUtil } from "../../utils/dateUtil";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ResponsivePie } from "@nivo/pie";

const from = new Date(2022, 0, 1);
const to = new Date();
const calendarTooltipOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const overviewOptions = { year: "numeric", month: "long", day: "numeric" };
const data = generateDayCounts(from, to);

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const dengueTypes = require("../../tempdata/landing_dengue_types.json");
const hospitalCases = getRandomNumberBetween(1, 50);
const icuCases = getRandomNumberBetween(1, 10);
const deathCases = getRandomNumberBetween(0, 10);
const newActiveCases = getRandomNumberBetween(50, 200);
const activeCases = getRandomNumberBetween(200, 1000);
const signs = ["+", "-"];
const randomSign = signs[(Math.random() * signs.length) | 0];

const Item = styled(Paper)((props) => ({
  textAlign: "center",
  color: "black",
  borderRadius: 0,
  backgroundColor: "rgb(245,245,243)",
}));

function CustomCalendarTooltip(data) {
  if (data.value === undefined) return null;
  const date = new Date(data.day);

  return (
    <Box sx={{ backgroundColor: "black", padding: 3 }}>
      <Typography sx={{ color: data.color, mb: 1 }}>
        <b>date: </b>
        {date.toLocaleDateString("en-GB", calendarTooltipOptions)}
      </Typography>
      <Typography sx={{ color: data.color }}>
        <b>cases: </b>
        {data.value}
      </Typography>
    </Box>
  );
}

function CustomBarChartTooltip(mockData) {
  const date = dateUtil.getDateFromString(mockData.data.day);

  return (
    <Box sx={{ backgroundColor: "black", padding: 3 }}>
      <Typography sx={{ mb: 1, color: "white" }}>
        <b>date: </b>
        {date.toString()}
      </Typography>
      <Typography sx={{ color: "white" }}>
        <b>cases: </b>
        {mockData.data.value}
      </Typography>
    </Box>
  );
}

function CustomBarChartAgeTooltip(mockData) {
  return (
    <Box sx={{ backgroundColor: "black", padding: 3 }}>
      <Typography sx={{ mb: 1, color: "white" }}>
        <b>group age: </b>
        {mockData.data.ageGroup}
      </Typography>
      <Typography sx={{ color: "white" }}>
        <b>number: </b>
        {mockData.data.value}
      </Typography>
    </Box>
  );
}

function CustomPieChartDengueTypeTooltip(data) {
  return (
    <Box sx={{ backgroundColor: "black", padding: 3 }}>
      <Typography sx={{ mb: 1, color: "white" }}>
        <b>dengue type: </b>
        {data.datum.label}
      </Typography>
      <Typography sx={{ color: "white" }}>
        <b>number: </b>
        {data.datum.value}
      </Typography>
    </Box>
  );
}

const ChartTitle = (props) => {
  return (
    <Typography
      color="black"
      sx={{
        fontSize: { xs: 20, md: 25, lg: 30 },
        fontWeight: 600,
        mb: 0,
        ml: props.ml,
        textAlign: "left",
      }}
    >
      {props.title}
    </Typography>
  );
};

const CustomCalendar = () => (
  <ResponsiveCalendar
    tooltip={CustomCalendarTooltip}
    data={data}
    from={from.toISOString()}
    to={to.toISOString()}
    emptyColor="rgba(232,232,232, 0.8)"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    yearSpacing={40}
    monthBorderWidth={1}
    monthBorderColor="#000000"
    dayBorderColor="#000000"
  />
);

const CustomStackChartBox = (props) => {
  var texts = props.titles.map(function (e, i) {
    return [e, props.subTitles[i]];
  });

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {texts.map((text) => (
        <Grid item xs={12} md={6} lg={3}>
          <Item
            sx={{
              backgroundColor: "rgb(245,245,243)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 25, md: 30, lg: 30 },
                fontWeight: 600,
                color: "rgb(26,116,211)",
              }}
            >
              {text[0]}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 15, md: 16, lg: 16 }, fontWeight: 300 }}
            >
              {text[1]}
            </Typography>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

const ValueOutside = ({ bars }) => {
  return bars.map((bar) => {
    const {
      key,
      x,
      y,
      width,
      height,
      data: { value },
    } = bar;

    return (
      <g key={key} transform={`translate(${x}, ${y - 10})`}>
        <text
          transform={`translate(${width / 2.1}, ${height / height})`}
          textAnchor="middle"
          fontSize="11px"
          fontFamily="Poppins"
        >
          {value}
        </text>
      </g>
    );
  });
};

const CustomDengueAgeBarChart = (props) => {
  const mockData = [];
  const ageGroups = [
    "0 to 9",
    "10 to 19",
    "20 to 29",
    "30 to 39",
    "40 to 49",
    "50 to 59",
    "60 to 69",
    "70+",
  ];

  useEffect(() => {
    for (let i = 0; i < ageGroups.length; i++) {
      const mockCase = {
        ageGroup: ageGroups[i],
        value: getRandomNumberBetween(props.min, props.max),
      };

      mockData.push(mockCase);
    }
  });

  return (
    <ResponsiveBar
      theme={{
        fontFamily: "Poppins",
        fontSize: 12,
        axis: { legend: { text: { fontSize: "14px" } } },
      }}
      data={mockData}
      keys={["value"]}
      indexBy="ageGroup"
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="rgb(26, 116, 211)"
      animate={true}
      enableLabel={false}
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "number of people",
        legendPosition: "middle",
        legendOffset: -52,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 3,
        tickRotation: 0,
        legend: "age group",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      tooltip={CustomBarChartAgeTooltip}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "rgb(26, 116, 211)",
          color: "#fff",
          rotation: -45,
          lineWidth: 2,
          spacing: 8,
        },
      ]}
      fill={[
        {
          match: {
            id: "value",
          },
          id: "lines",
        },
      ]}
      layers={[
        "grid",
        "axes",
        "bars",
        "markers",
        "legends",
        "annotations",
        (props) => <ValueOutside {...props} />,
      ]}
    />
  );
};
const CustomDengueCasesBarChart = (props) => {
  const smallScreen = useMediaQuery(
    (theme) => theme.breakpoints.up("xs") && theme.breakpoints.down("md")
  );
  const mediumScreen = useMediaQuery(
    (theme) => theme.breakpoints.up("md") && theme.breakpoints.down("lg")
  );
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  let [days] = useState(30);

  if (smallScreen) {
    days = 7;
  } else if (mediumScreen) {
    days = 14;
  } else if (largeScreen) {
    days = 30;
  }

  const mockData = [];

  useEffect(() => {
    for (let i = 0; i < days; i++) {
      const mockCase = {
        day: dateUtil
          .getPreviousDateByAmountOfDaysFromCurrentDate(i)
          .toString(),
        value: getRandomNumberBetween(props.min, props.max),
      };

      mockData.unshift(mockCase);
    }
  });

  return (
    <ResponsiveBar
      theme={{
        fontFamily: "Poppins",
        fontSize: 12,
        axis: { legend: { text: { fontSize: "14px" } } },
      }}
      data={mockData}
      keys={["value"]}
      indexBy="day"
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="rgb(26, 116, 211)"
      animate={true}
      enableLabel={false}
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "cases",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 3,
        tickRotation: 25,
      }}
      tooltip={CustomBarChartTooltip}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "rgb(26, 116, 211)",
          color: "#fff",
          rotation: -45,
          lineWidth: 2,
          spacing: 8,
        },
      ]}
      fill={[
        {
          match: {
            id: "value",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
    />
  );
};

const CustomDengueTypesChart = () => {
  return (
    <ResponsivePie
      data={dengueTypes}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={CustomPieChartDengueTypeTooltip}
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
      fill={[
        {
          match: {
            id: "DENV-1",
          },
          id: "dots",
        },

        {
          match: {
            id: "DENV-2",
          },
          id: "lines",
        },
        {
          match: {
            id: "DENV-3",
          },
          id: "dots",
        },

        {
          match: {
            id: "DENV-4",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
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

const DengueTypeCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Dengue cases classified by type of dengue virus" />

      <Grid container sx={{ height: 600, mt: 3 }}>
        <CustomDengueTypesChart />
      </Grid>
    </Grid>
  );
};

const DengueAgeActiveCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Age of active dengue cases" />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueAgeBarChart min={300} max={1500} />
      </Grid>
    </Grid>
  );
};

const DengueAgeHospitalisedCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Age of hospitalised dengue cases since January 2022" />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueAgeBarChart min={300} max={1500} />
      </Grid>
    </Grid>
  );
};

const DengueDailyNewCommunityCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: { xs: 30, md: 30, lg: 10 },
      }}
    >
      <ChartTitle title="Daily new community dengue cases" />
      <CustomStackChartBox
        titles={[
          getRandomNumberBetween(1, 50),
          `${randomSign}${getRandomNumberBetween(1, 20)}`,
          getRandomNumberBetween(100, 300),
          getRandomNumberBetween(100, 300),
        ]}
        subTitles={[
          "cases today",
          "change from yesterday",
          "7 day average",
          "7 day average a week ago",
        ]}
      />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueCasesBarChart min={1} max={50} />
      </Grid>
    </Grid>
  );
};

const DengueHospitalCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="People in hospital due to dengue" />
      <CustomStackChartBox
        titles={[
          hospitalCases,
          `${randomSign}${getRandomNumberBetween(1, 20)}`,
          getRandomNumberBetween(100, 300),
          getRandomNumberBetween(100, 300),
        ]}
        subTitles={[
          "in hospital today",
          "change from yesterday",
          "7 day average",
          "7 day average a week ago",
        ]}
      />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueCasesBarChart min={1} max={50} />
      </Grid>
    </Grid>
  );
};

const DengueICUCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Daily new community dengue cases" />
      <CustomStackChartBox
        titles={[
          icuCases,
          `${randomSign}${getRandomNumberBetween(1, 10)}`,
          getRandomNumberBetween(100, 300),
          getRandomNumberBetween(100, 300),
        ]}
        subTitles={[
          "in ICU today",
          "change from yesterday",
          "7 day average",
          "7 day average a week ago",
        ]}
      />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueCasesBarChart min={1} max={50} />
      </Grid>
    </Grid>
  );
};

const DengueDeathCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Daily new community dengue cases" />
      <CustomStackChartBox
        titles={[
          deathCases,
          `${randomSign}${getRandomNumberBetween(1, 5)}`,
          getRandomNumberBetween(5, 35),
          getRandomNumberBetween(5, 35),
        ]}
        subTitles={[
          "death announced today",
          "change from yesterday",
          "7 day average",
          "7 day average a week ago",
        ]}
      />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueCasesBarChart min={1} max={50} />
      </Grid>
    </Grid>
  );
};

const DengueBorderCases = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      sx={{
        margin: "0 auto",
        width: { xs: "90%", md: "80%", lg: "80%" },
        mt: 10,
      }}
    >
      <ChartTitle title="Daily new border dengue cases" />
      <CustomStackChartBox
        titles={[
          getRandomNumberBetween(1, 50),
          `${randomSign}${getRandomNumberBetween(1, 50)}`,
          getRandomNumberBetween(100, 300),
          getRandomNumberBetween(100, 200),
        ]}
        subTitles={[
          "cases today",
          "change from yesterday",
          "7 day average",
          "7 day average a week ago",
        ]}
      />

      <Grid container sx={{ height: 400 }}>
        <CustomDengueCasesBarChart min={1} max={50} />
      </Grid>
    </Grid>
  );
};

const Overview = () => {
  return (
    <Grid container sx={{ width: "100%", mt: 10, mb: 3 }}>
      <Grid
        container
        sx={{
          alignItems: "center",
          flexDirection: "column",
          mb: 10,
          width: { xs: "90%", md: "80%", lg: "70%" },
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            background:
              "linear-gradient(90deg, rgba(40, 74, 255, 1) 0%, rgba(18, 30, 33, 1) 100%);",
            backgroundClip: "text",
            color: "transparent",
            fontSize: { xs: 30, md: 40, lg: 50 },
            fontWeight: 700,
            lineHeight: { xs: "42px", md: "52px", lg: "75px" },
            textAlign: "center",
          }}
        >
          Dengue data visualisations: Vietnam in numbers
        </Typography>
      </Grid>
      {/* Calendar View */}
      <Grid
        container
        sx={{
          width: { xs: "100%", md: "85%", lg: "80%" },
          margin: "0 auto",
          height: { xs: 200, md: 200, lg: 300 },
          mt: 10,
        }}
      >
        <ChartTitle title="Total daily dengue cases in Vietnam (2022)" ml={2} />
        <CustomCalendar />
      </Grid>
      <Grid
        container
        sx={{
          width: { xs: "90%", md: "90%", lg: "70%" },
          margin: "0 auto",
          flexDirection: { xs: "row", md: "row", lg: "row" },
          justifyContent: "center",
          mt: { xs: 0, md: 3, lg: 1 },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mr: { xs: 3, md: 5, lg: 5 } }}>
          <Item
            sx={{
              width: { xs: 15, md: 20, lg: 20 },
              height: { xs: 15, md: 20, lg: 20 },
              backgroundColor: "rgb(232,232,232)",
            }}
          />
          <Typography sx={{ fontSize: { xs: 13, md: 15, lg: 15 }, mr: 2 }}>
            {" "}
            unreported
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mr: { xs: 3, md: 5, lg: 5 } }}>
          <Item
            sx={{
              width: { xs: 15, md: 20, lg: 20 },
              height: { xs: 15, md: 20, lg: 20 },
              backgroundColor: "rgba(97,205,187,0.8)",
            }}
          />
          <Typography sx={{ fontSize: { xs: 13, md: 15, lg: 15 }, mr: 2 }}>
            {" "}
            low
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mr: { xs: 3, md: 5, lg: 5 } }}>
          <Item
            sx={{
              width: { xs: 15, md: 20, lg: 20 },
              height: { xs: 15, md: 20, lg: 20 },
              backgroundColor: "rgb(232,193,160)",
            }}
          />
          <Typography sx={{ fontSize: { xs: 13, md: 15, lg: 15 }, mr: 2 }}>
            {" "}
            medium
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mr: { xs: 3, md: 5, lg: 5 } }}>
          <Item
            sx={{
              width: { xs: 15, md: 20, lg: 20 },
              height: { xs: 15, md: 20, lg: 20 },
              backgroundColor: "rgb(244,117,96)",
            }}
          />
          <Typography sx={{ fontSize: { xs: 13, md: 15, lg: 15 }, mr: 2 }}>
            {" "}
            high
          </Typography>
        </Stack>
      </Grid>
      {/* Overview */}
      <Grid
        container
        spacing={2}
        sx={{
          margin: "0 auto",
          width: { xs: "95%", md: "80%", lg: "80%" },
          mt: 10,
        }}
      >
        <Grid item xs={12} md={12} lg={4}>
          <Item
            sx={{
              background: "rgb(255,245,204)",
              py: 8,
              pb: 15,
              textAlign: "left",
              width: { xs: "98.5%", md: "99%", lg: "100%" },
            }}
          >
            <Box sx={{ mx: 3 }}>
              {" "}
              <Typography
                sx={{
                  fontSize: { xs: 30, md: 35, lg: 35 },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Dengue cases
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 17, md: 18, lg: 18 },
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Last updated {to.toLocaleDateString("en-GB", overviewOptions)}{" "}
                at 12:00 am
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 15, lg: 15 },
                  fontWeight: 300,
                  mb: 3,
                }}
              >
                OUCRU collects data from the Ministry of Health of Vietnam and
                other relevant sources. This includes:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 15, lg: 15 },
                  fontWeight: 300,
                  mb: 3,
                  ml: 3,
                }}
              >
                <li>current dengue cases</li>
                <li>source of dengue cases</li>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 15, lg: 15 },
                  fontWeight: 300,
                }}
              >
                We update this data every day, including the weekend case
                numbers. The data will be refreshed upon new day.
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <Grid
            container
            sx={{
              flexDirection: "row",
              height: { xs: "50%", md: "50%", lg: "32%" },
              mb: 1,
            }}
          >
            <Item
              sx={{
                width: { xs: "48.5%", md: "49%", lg: "49%" },
                mr: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 35, md: 40, lg: 50 }, fontWeight: 700 }}
              >
                {hospitalCases}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 15, md: 16, lg: 18 }, fontWeight: 300 }}
              >
                Cases in hospital
              </Typography>
            </Item>
            <Item
              sx={{
                width: { xs: "48.4%", md: "49%", lg: "49%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 35, md: 40, lg: 50 }, fontWeight: 700 }}
              >
                {newActiveCases}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 15, md: 16, lg: 18 }, fontWeight: 300 }}
              >
                New active cases (community and border)
              </Typography>
            </Item>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              height: { xs: "50%", md: "50%", lg: "32%" },
              mb: 1,
            }}
          >
            <Item
              sx={{
                width: { xs: "48.5%", md: "49%", lg: "49%" },
                mr: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 35, md: 40, lg: 50 }, fontWeight: 700 }}
              >
                {icuCases}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 15, md: 16, lg: 18 }, fontWeight: 300 }}
              >
                Cases in ICU
              </Typography>
            </Item>
            <Item
              sx={{
                width: { xs: "48.4%", md: "49%", lg: "49%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 35, md: 40, lg: 50 }, fontWeight: 700 }}
              >
                {activeCases}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 15, md: 16, lg: 18 }, fontWeight: 300 }}
              >
                Active cases (community and border)
              </Typography>
            </Item>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              height: { xs: "50%", md: "50%", lg: "32.8%" },
            }}
          >
            <Item
              sx={{
                backgroundColor: "rgb(245,245,243)",
                width: { xs: "98.3%", md: "98.9%", lg: "98.9%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 35, md: 40, lg: 50 }, fontWeight: 700 }}
              >
                Ho Chi Minh
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 15, md: 16, lg: 18 }, fontWeight: 300 }}
              >
                City that has the most dengue cases
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      {/* Charts */}
      <DengueDailyNewCommunityCases />
      <DengueHospitalCases />
      <DengueICUCases />
      <DengueDeathCases />
      <DengueBorderCases />
      <DengueAgeActiveCases />
      <DengueAgeHospitalisedCases />
      <DengueTypeCases />
    </Grid>
  );
};

export default Overview;
