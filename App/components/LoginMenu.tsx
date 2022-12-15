import React from 'react';
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";
import { PowerBiLoginRequest } from "../AuthConfig";

import { Box, Button, Menu, MenuItem, Divider } from '@mui/material';
import { AccountCircle, Login, Logout, KeyboardArrowDown } from '@mui/icons-material';

const LoginMenu = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [anchorElementLoginMenu, setAnchorElementLoginMenu] = React.useState<HTMLElement | null>(null);

  const loginUser = () => {
    instance.loginPopup(PowerBiLoginRequest);
  };

  const logoutUser = () => {
    instance.logoutPopup();
  };

  if (isAuthenticated) {
    return (
      <Box sx={{ marginLeft: "auto" }}>
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => { setAnchorElementLoginMenu(event.currentTarget); }}
          startIcon={<AccountCircle />}
          endIcon={<KeyboardArrowDown />}
          sx={{ color: "white", marginRight: "12px;" }} >
          {account?.name}
        </Button>
        <Menu
          anchorEl={anchorElementLoginMenu}
          open={Boolean(anchorElementLoginMenu)}
          onClose={() => setAnchorElementLoginMenu(null)}
        >
          <MenuItem disableRipple onClick={() => {
            setAnchorElementLoginMenu(null);
            logoutUser();
          }} >
            <Logout sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  else {
    return (
      <Box sx={{ marginLeft: "auto", marginRight: "12px" }}>
        <Button onClick={loginUser} color="inherit" startIcon={<Login />}  >Login</Button>
      </Box>
    );

  }
}

export default LoginMenu;