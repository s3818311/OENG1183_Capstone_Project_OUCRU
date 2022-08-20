import React from "react";
import "../../styles/landing/possibility.css";
import possibilityImage from "../../assets/landing/possibility.png";
import Divider from "@mui/material/Divider";

const Possibility = () => {
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        <img src={possibilityImage} alt="possibility" />
      </div>
      <div className="gpt3__possibility-content">
        <h1 className="gradient__text">Our Philosophy</h1>
        <Divider
          variant="left"
          sx={{
            width: "5%",
            mt: 0,
            mb: 3,
            borderBottomWidth: 5,
            background: "rgb(255,138,113)",
          }}
        />
        <h4>This website </h4>
        <p>
          This website aims to act asan interactive progressive application that
          can be accessed by the general public and professionals. The system
          will provide dengue related information that is updated in real-time,
          or to the closest available time, with appropriate visual designs that
          can be understood by all users. As a result, a wider Vietnamese
          audience can interact with the system and thus outbreak awareness can
          be more proficiently spread out.
        </p>
        <br></br>
        <h4>Actionable Inferences </h4>
        <p>
          Furthermore, by exploring the relationships between multiple causal
          factors and the dengue transmission probability, scientists can
          identify even more plausible factors, particularly geographical and
          socioeconomic factors for possible dengue outbreaks in Vietnam.
          Governments and upper medical decision makers can have more
          preparation to develop disease-treating measures for areas at risk of
          future outbreaks and inside the current dengue transmission zone, and
          even shift dengue control towards a more preventative strategy.
        </p>
        <br></br>
        <h4>Future Directions</h4>
        <p>
          DART is currently at its beginning stage and always under active
          development. Our ultimate goal is use efficient modelling approaches
          and evaluations that incorporate various high resolution data to model
          the importation dynamics in areas of cryptaic and sporadic circulation
          in cities where dengue is emerging in Vietnam on both short/long
          timescales and small/large spatial areas.
        </p>
        <br></br>
      </div>
    </div>
  );
};

export default Possibility;
