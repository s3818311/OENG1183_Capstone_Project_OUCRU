import * as React from "react";
import Typography from "@mui/material/Typography";
import { dateUtil } from "../../../utils/dateUtil";

const Footer = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {dateUtil.getCurrentYear()}
      {" by RMIT Vietnam and OUCRU. All rights reserved."}
    </Typography>
  );
};

export default Footer;
