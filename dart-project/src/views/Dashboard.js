import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TopBar from '../components/global/TopBar';
import SideBar from '../components/global/SideBar';
import {Suspense} from 'react';
import { Routes, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import PropTypes from 'prop-types';
import navigationRoutes from '../routes/NavigationRoutes';

const mdTheme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 16,
                }
            }
        }
    }
});

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>
    }
  
    return(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}
  
Router.propTypes = {
    children: PropTypes.node
};

function DashboardContent() {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return(
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TopBar open={open} toggleDrawer={toggleDrawer} />
                
                <Suspense fallback={<div></div>}>
                    <Router>
                        <SideBar open={open} toggleDrawer={toggleDrawer} />
                        <Routes>
                            {navigationRoutes}
                        </Routes>
                    </Router>
                </Suspense>
               
                
            </Box>
        </ThemeProvider>
    );
}


export default function Dashboard() {
    return <DashboardContent />
}