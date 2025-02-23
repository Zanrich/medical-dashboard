import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import {
  Dashboard,
  Person,
  People,
  LocalHospital,
  Description,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.grey[200]}`,
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'My Profile', icon: <Person />, path: '/profile' },
  { text: 'Manage Users', icon: <People />, path: '/users' },
  { text: 'Manage Patients', icon: <LocalHospital />, path: '/patients' },
  { text: 'Logs', icon: <Description />, path: '/logs' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p: 3 }}>
        <img src={require('../../assets/images/Logo.png')} alt="Logo" style={{ width: 150 }} />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} >
            <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}>
                <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};