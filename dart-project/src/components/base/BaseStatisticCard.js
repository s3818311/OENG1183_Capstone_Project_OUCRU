import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BarChartIcon from "@mui/icons-material/BarChart";
import { styled } from "@mui/material/styles";

const CustomCardIconButton = styled(IconButton)(({ theme }) => ({
  "&.MuiIconButton-root": {
    backgroundColor: theme.palette.grey[50],
    border: "1px solid rgba(0, 0, 0, 0.5)",
    color: "black",
    width: "50px",
    height: "50px",
  },
  ".MuiSvgIcon-root": {
    fontSize: "30px",
  },
}));

function BaseStatisticCard() {
  return (
    <div>
      <CustomCardIconButton>
        <BarChartIcon />
      </CustomCardIconButton>
    </div>
  );
}

export default BaseStatisticCard;
