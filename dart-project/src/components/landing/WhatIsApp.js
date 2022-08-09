import React from "react";
import "../../styles/landing/whatisapp.css";

const Feature = ({ title, text }) => {
  return (
    <div className="gpt3__features-container__feature">
      <div className="gpt3__features-container__feature-title">
        <div />
        <h1>{title}</h1>
      </div>
      <div className="gpt3__features-container_feature-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

const WhatIsApp = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature
        title="What is DART"
        text="The Dengue Advanced Readiness Tools (DART) Project is established to accomplish its assignment as one of the pioneered dengue forecasting tools in Vietnam, in collaboration with the Oxford University Clinical Research Unit (OUCRU). This completion plan describes the significant benefits the project will bring to Vietnam dengue control management system, as well as the means and necessary actions to implement an interactive visualisation dashboard and a data management platform (data pipeline and data portal)"
      />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">
        An open-source project to harness the scientific and public health
        potential of dengue data
      </h1>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature
        title="Project1"
        text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
      />
      <Feature
        title="Project2"
        text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
      />
      <Feature
        title="Project3"
        text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
      />
    </div>
  </div>
);

export default WhatIsApp;
