import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import headache from "../../assets/landing/headache.jpg";
import abdominalPain from "../../assets/landing/abdominal_pain.jpg";
import blood from "../../assets/landing/blood.jpg";
import bodyPain from "../../assets/landing/body_pain.jpg";
import nauseaVomit from "../../assets/landing/nausea_vomitting.jpg";
import rash from "../../assets/landing/rash.jpg";
import tired from "../../assets/landing/tired.webp";
import fever from "../../assets/landing/fever.webp";

const green = "#3ea055";
const red = "#FF0000";
const yellow = "#FFE135";

const symptoms = [
  /* Symptom */
  {
    src: fever,
    title: "Fever",
    content:
      "One of the most common dengue symptoms is having a fever upon infected. Dengue should be suspected with a high fever (around 40 degrees).",
    chips: [
      {
        label: "Common",
        color: green,
      },
      {
        label: "Mild",
        color: yellow,
      },
    ],
  },
  /* Symptom*/
  {
    src: headache,
    title: "Headache",
    content:
      "Headache is normally accompanied with fever. Although it is a common symptom, you may experience mild to severe headache.  ",
    chips: [
      {
        label: "Common",
        color: green,
      },
      {
        label: "Mild",
        color: yellow,
      },
      {
        label: "Extreme",
        color: red,
      },
    ],
  },
  /* Symptom */
  {
    src: rash,
    title: "Rash",
    content:
      "Dengue also cause small, red pinhead-like rashes in different body parts and they might be itchy. This may make you even more unconformtable and irritable during the fever.",
    chips: [
      {
        label: "Common",
        color: green,
      },
    ],
  },
  /* Symptom */
  {
    src: bodyPain,
    title: "Eye/Body Pain",
    content:
      "Pain behind the eyes or body pain such as muscle/joint/bone tingling are likely to happen (93%) when getting affected during the early phase.",
    chips: [
      {
        label: "Common",
        color: green,
      },
    ],
  },
  /* Symptom */
  {
    src: nauseaVomit,
    title: "Nausea/Vomitting",
    content:
      "When infected, you may lose your appetite and feel nausea all the time. Vomitting can also occur and should be treated carefully due to dehydration.",
    chips: [
      {
        label: "Mild",
        color: yellow,
      },
      {
        label: "Extreme",
        color: red,
      },
    ],
  },
  /* Symptom */
  {
    src: abdominalPain,
    title: "Abdominal Pain",
    content:
      "One of the warning signs is having abdominal discomfort. It is reported that up to 40% of patients that have dengue fever will experience mild to severe abdominal pain.",
    chips: [
      {
        label: "Mild",
        color: yellow,
      },
      {
        label: "Extreme",
        color: red,
      },
    ],
  },
  /* Symptom */
  {
    src: blood,
    title: "Blood Overflowing",
    content:
      "This can range from having nose bleed or bleeding gums, throwing up blood or blood in your poop, where you need immediate medical attention upon experiencing.",
    chips: [
      {
        label: "Extreme",
        color: red,
      },
    ],
  },
  /* Symptom */
  {
    src: tired,
    title: "Extreme Tiredness",
    content:
      "Fatigue or extreme irritation is common during the acute stage of dengue, which results in decreased capacity of work, and may persist for several weeks after recovery.",
    chips: [
      {
        label: "Extreme",
        color: red,
      },
    ],
  },
];

const SymptomCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: { xs: 400, md: 400, lg: 345 },
        minWidth: 250,

        pointerEvents: "none",
      }}
      elevation={5}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={props.info.src}
          alt={props.info.title}
        />
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.info.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.info.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mt: 3 }}>
        {props.info.chips.map((chip) => (
          <SymptomDegree label={chip.label} backgroundColor={chip.color} />
        ))}
      </CardActions>
    </Card>
  );
};

const SymptomDegree = (props) => {
  return (
    <Chip
      label={props.label}
      sx={{
        backgroundColor: `${props.backgroundColor}`,
        color: "white",
        fontWeight: 500,
      }}
    />
  );
};

const FirstSymptomsRow = () => {
  return (
    <Grid container spacing={5} sx={{}}>
      {symptoms.slice(0, 4).map((symptom) => (
        <Grid item xs={12} md={6} lg={3}>
          <SymptomCard info={symptom} />
        </Grid>
      ))}
    </Grid>
  );
};

const SecondSymptomsRow = () => {
  return (
    <Grid
      container
      spacing={5}
      sx={{
        mt: { xs: 0, md: 0, lg: 5 },
      }}
    >
      {symptoms.slice(4, 8).map((symptom) => (
        <Grid item xs={12} md={6} lg={3}>
          <SymptomCard info={symptom} />
        </Grid>
      ))}
    </Grid>
  );
};

const DengueSymptoms = () => (
  <Grid
    container
    sx={{ width: "100%", margin: "0 auto", flexDirection: "column", py: 5 }}
  >
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
        }}
      >
        Symptoms
      </Typography>
      <Typography
        sx={{
          mt: 2,
          fontSize: { xs: 16, md: 18, lg: 20 },
          fontWeight: 400,
          color: "rgba(0,0,0,0.7)",
          textAlign: "center",
        }}
      >
        Because the initial signs of fever, headache, and body aches are not
        unique to dengue, it can be challenging to diagnose the condition.
        Malaria, typhoid, zika, and influenza are just a few of the ailments
        that might be mistakenly identified as dengue. Because there are up to{" "}
        <b>four </b>
        dengue viruses, having one infection does not make you immune to getting
        another. The symptoms of a second dengue infection are frequently worse
        and should be treated with caution.
        <br />
        <br />
        If you ever experience any <b>extreme</b> symptoms below or unsure what
        actions to take, please inform your surroundings and local health
        authorities immediately.
      </Typography>
    </Grid>
    <Grid
      container
      sx={{
        width: { xs: "50%", md: "65%", lg: "85%" },
        margin: "0 auto",
        py: 5,
      }}
    >
      <FirstSymptomsRow />
      <SecondSymptomsRow />
    </Grid>
  </Grid>
);

export default DengueSymptoms;
