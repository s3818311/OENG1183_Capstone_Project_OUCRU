import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems , secondaryListItems } from '../barItems/sidebar/ListItems';
import Drawer from '../barItems/sidebar/Drawer';

const SideBar = (props) => {
    return(
        <Drawer variant="permanent" open={props.open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={props.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <List aria-label="main">
                    {mainListItems}
          </List>
          <Divider />
          <List aria-label="secondary">
            {secondaryListItems}
          </List>
        </Drawer>
    );
}

export default SideBar;