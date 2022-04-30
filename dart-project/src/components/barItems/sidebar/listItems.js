import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
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
       <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
       <ListItemLink to="/view2" primary="Orders" icon={<ShoppingCartIcon/>} />
       <ListItemLink to="/view3" primary="Customers" icon={<PeopleIcon/>} />
    </React.Fragment>
  );

export const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemLink to="/view3" primary="Current month" icon={<AssignmentIcon />} />
      <ListItemLink to="/view3" primary="Last quarter" icon={<AssignmentIcon/>} />
      <ListItemLink to="/view3" primary="Year-end sale" icon={<AssignmentIcon/>} />
    </React.Fragment>
);
