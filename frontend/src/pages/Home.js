import { Typography, Box } from '@mui/material';
import React from 'react';
import HomePic from './HomePic.webp';

function Home() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      
      {/* Sol kısım: Başlık ve paragraf */}
      <Box sx={{ flex: 1, paddingRight: '24px' }}>
        <Typography variant='h3' gutterBottom>
          Streamlined Ticketing System for Your Products
        </Typography>
        <Typography variant='body1'>
          Welcome to the Help Desk platform, your one-stop solution for managing customer support and product-related inquiries. Our system is designed to help you easily organize, customize, and prioritize tickets, ensuring that no customer issue is left unresolved. You can track progress, assign tasks, and schedule responses efficiently, all within a single, user-friendly interface.
        </Typography>
      </Box>

      {/* Sağ kısım: Resim */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <img src={HomePic} alt="Help Desk Overview" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}

export default Home;
