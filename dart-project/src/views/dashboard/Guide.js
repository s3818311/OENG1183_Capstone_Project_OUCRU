// import React from 'react';

// const Guide = () => { 
//     // return (
//     //     <div>
//     //         <h2>View 3</h2>
//     //     </div>
//     // );
// };


// export default Guide;
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
const IframeCustomized = styled.div`
  background-color: white;
`;
function Guide (){
		return <div>
			<div>Interactive Report</div>
			<IframeCustomized> 
			<iframe src="https://customized-dashboard-deploy.vercel.app/" width="1430" height ="1300" />;
			{/* <iframe src="https://baonhi3008.github.io/DART-testing/" width="1570" height ="1300" />; */}
			</IframeCustomized>
			
		</div>
	
}
export default Guide ;