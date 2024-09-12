import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from 'react'

const drawerWidth = 240;

function Sidebar() {
    return (
        <Drawer
            variant='permanent'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, // bu propları araştır
            }}>
            
            <Toolbar sx={{ minHeight: 64 }}> 
                <List>
                    <ListItem button component={Link} to = "/">
                        <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to = "/tickets">
                        <ListItemIcon> <TableChartIcon /></ListItemIcon>
                        <ListItemText primary="Tickets" />
                    </ListItem>
                    <ListItem button component={Link} to = "/create">
                        <ListItemIcon> <AddBoxIcon /></ListItemIcon>
                        <ListItemText primary="Create Ticket" />  
                    </ListItem>
                </List>
            </Toolbar>

        </Drawer>
    )
}

export default Sidebar