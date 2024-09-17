import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from 'react';

const drawerWidth = 240;

const links = [
  { text: 'Home', icon: <DashboardIcon />, to: '/' },
  { text: 'Tickets', icon: <TableChartIcon />, to: '/tickets' },
  { text: 'Create Ticket', icon: <AddBoxIcon />, to: '/create' },
];

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLinks = links.filter(link =>
    link.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}>
      <Toolbar sx={{ minHeight: 64, marginTop: '80px' }}>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Toolbar>
      <List>
        {filteredLinks.map((link, index) => (
          <ListItem button component={Link} to={link.to} key={index}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
