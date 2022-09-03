import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ListItem from "@mui/material/ListItem";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PropTypes from "prop-types";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import * as ROUTES from "../../../../enums/routes.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomListItem = styled(ListItem)({
  "&.MuiListItem-root": {
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.1)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(25, 118, 210, 0.9)",
      color: "white",
      ".MuiListItem-root:hover": {
        backgroundColor: "rgba(25, 118, 210, 0.9 )",
      },
      ".MuiSvgIcon-root": {
        color: "white",
      },
    },
  },
});

function ListItemLink(props) {
  const { icon, primary, to } = props;
  const location = useLocation();
  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li key={location.pathname}>
      <CustomListItem
        button
        component={renderLink}
        selected={"/dashboard/" + to === location.pathname}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </CustomListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export const mainListItems = (
  <React.Fragment>
    <ListItemLink
      to={ROUTES.DASHBOARD.OVERVIEW}
      primary="Overview"
      icon={<DashboardIcon />}
    />
    <ListItemLink
      to={ROUTES.DASHBOARD.STATISTIC}
      primary="Statistic"
      icon={<BarChartIcon />}
    />
    <ListItemLink
      to={ROUTES.DASHBOARD.QUERY}
      primary="Query Builder"
      icon={<QueryStatsIcon />}
    />
    <ListItemLink
      to={ROUTES.DASHBOARD.GUIDE}
      primary="Guide"
      icon={<FindInPageIcon />}
    />
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemLink
      to="/dashboard/"
      primary="Report 1"
      icon={<AssignmentIcon />}
    />
    <ListItemLink
      to="/dashboard/"
      primary="Report 2"
      icon={<AssignmentIcon />}
    />
    <ListItemLink
      to="/dashboard/"
      primary="Report 3"
      icon={<AssignmentIcon />}
    />
  </React.Fragment>
);

export const homeListItem = (
  <React.Fragment>
    <ListItemLink
      to={ROUTES.DEFAULT}
      primary="Home Page"
      icon={<ArrowBackIcon />}
    />
  </React.Fragment>
);
