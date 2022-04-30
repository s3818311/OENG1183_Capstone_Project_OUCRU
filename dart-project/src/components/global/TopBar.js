import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '../barItems/topbar/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

function TopBar(props) {
  

  return(
      <AppBar position="absolute" open={props.open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h1"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account Settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="M" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            
          </Box>
          
        </Toolbar>
      </AppBar>
  );
}

export default TopBar;