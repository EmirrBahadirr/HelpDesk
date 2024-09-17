import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import logo from './logo.png';

function Topbar() {
  return (
    <AppBar position="fixed" sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Sol taraf: Logo ve Help Desk yazısı */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" 
              style={{ 
              height: '40px', 
              width: '40px', 
              borderRadius: '50%',  // Yuvarlak şekil
              marginRight: '16px' 
            }} />
          <Typography variant="h6" component="div">
            Help Desk
          </Typography>
        </Box>

        {/* Sağ taraf: Profil ve About simgeleri */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <InfoIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;