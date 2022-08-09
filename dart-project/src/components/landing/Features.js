import React from "react";
import "../../styles/landing/feature.css";
import "../../styles/landing/features.css";

const featureData = [
  {
    title: "Access data visualization dashboard",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget quam in nunc varius placerat sit amet sit amet metus.",
  },
  {
    title: "Choose metric to display",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget quam in nunc varius placerat sit amet sit amet metus.",
  },
  {
    title: "Filter a time range",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget quam in nunc varius placerat sit amet sit amet metus.",
  },
  {
    title: "Choose type of visualization",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget quam in nunc varius placerat sit amet sit amet metus.",
  },
];

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

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text"> User Guidance</h1>
      <p>Simple steps to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featureData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
