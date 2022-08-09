import React from "react";
import "../../styles/landing/possibility.css";
import possibilityImage from "../../assets/landing/possibility.png";

const Possibility = () => {
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        <img src={possibilityImage} alt="possibility" />
      </div>
      <div className="gpt3__possibility-content">
        <h1 className="gradient__text">Our Philosohpies</h1>
        <h4>Easy to use</h4>
        <p>
          In the course of an infection and over an epidemic, pathogens
          naturally accumulate random mutations to their genomes.{" "}
        </p>
        <br></br>
        <h4>Make data becomes easier to understand </h4>
        <p>
          In the course of an infection and over an epidemic, pathogens
          naturally accumulate random mutations to their genomes.{" "}
        </p>
        <br></br>
        <h4>Customize visualization of your choice</h4>
        <p>
          In the course of an infection and over an epidemic, pathogens
          naturally accumulate random mutations to their genomes.{" "}
        </p>
        <br></br>
      </div>
    </div>
  );
};

export default Possibility;
