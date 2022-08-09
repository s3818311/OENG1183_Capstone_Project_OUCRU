import React from "react";
import "../../styles/landing/header.css";
import ai from "../../assets/landing/header.jpeg";

const Header = () => {
  return (
    <div className="dart__header section__padding" id="home">
      <div className="dart__header-content">
        <h1 className="gradient__text">Dengue Advance Reading Tools</h1>
        <p>
          The Dengue Advanced Readiness Tools (DART) Project is established to
          accomplish its assignment as one of the pioneered dengue forecasting
          tools in Vietnam.
        </p>
        <div className="dart__header-content__input">
          <input
            type="email"
            placeholder="Enter email to get news from us"
          ></input>
          <button type="button">Submit</button>
        </div>
      </div>
      <div className="dart__header-image">
        <img src={ai} alt="Artificial Intelligence" />
      </div>
    </div>
  );
};

export default Header;
