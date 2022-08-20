import React from "react";
import Logo from "../../dart_proj.svg";
import "../../styles/landing/footer.css";

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="footer__heading__text">Contact Us</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="gpt3__footer-content">
      This website is in beta version. The purpose is to act as an example of
      what the real DART website look like in the official version. As such, any
      data you see on here are mostly mock data and used for visualisation
      purposes only. Please do not mistake any of these as real-life statistics.
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={Logo} alt="gpt3_logo" />
        <p>
          OUCRU OFFICE 2022 <br /> All Rights Reserved
        </p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>OUCRU office</p>
        <p>085-132567</p>
        <p>info@dart.org</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2022 DART. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
