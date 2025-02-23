import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { NotificationsPanel } from '../dashboard/NotificationsPanel';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={() => setNotificationsOpen(true)}
        >
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar>AS</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
        <NotificationsPanel
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />
      </Toolbar>
    </StyledAppBar>
  );
};