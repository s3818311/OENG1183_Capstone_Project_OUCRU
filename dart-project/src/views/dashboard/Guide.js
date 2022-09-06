import { CardMedia,Card } from '@mui/material';
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./frame.css"
import { MDBContainer, MDBIframe } from "mdbreact";

const IframeCustomized = styled.div`
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: 100%

`;

function Guide (){
		return (
			<div className="container">
				<iframe className="responsive-iframe" src="https://customized-dashboard-deploy.vercel.app/"></iframe>
			</div>
		  );
}
export default Guide ;