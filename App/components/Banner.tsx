import React from 'react';
import { useIsAuthenticated } from "@azure/msal-react";
import { AppBar, Divider, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Assessment } from '@mui/icons-material';

import LoginMenu from './LoginMenu';

const Banner = () => {
  let isAuthenticated = useIsAuthenticated();
 
  return (
    <AppBar position="relative" sx={{ zIndex: 2, background: "linear-gradient(to right bottom, #00498D, #02386E)" }}  >
      <Toolbar variant='dense' disableGutters >
        <IconButton color="inherit" sx={{mx:0}} >
          <Assessment  />
          <Typography variant="h6" sx={{ml:1}} >Power BI Quick Create SDK Demo</Typography>
        </IconButton>
        <Divider orientation='vertical' flexItem sx={{mx:1}} />
        <LoginMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Banner;