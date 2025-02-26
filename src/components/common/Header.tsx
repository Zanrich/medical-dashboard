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
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import notificationIcon from '../../assets/icons/notification.png';
import { NotificationsPanel } from '../dashboard/NotificationsPanel';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(3),
    minWidth: 220,
    borderRadius: '12px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -7,
      right: 20,
      width: 18,
      height: 18,
      borderRadius: '4px',
      backgroundColor: theme.palette.background.paper,
      transform: 'rotate(45deg)',
      borderLeft: `1px solid ${theme.palette.grey[200]}5`,
      borderTop: `1px solid ${theme.palette.grey[200]}5`,
      zIndex: 0,
    },
  },
}));
const MenuHeader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
}));

const MenuItems = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
}));

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeDown = useMediaQuery(theme.breakpoints.up('lg'));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ px: 3.75 }}>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="primary"
          onClick={handleNotificationClick}
          sx={{
            width: 44,
            height: 44,
          }}
        >
          <Badge badgeContent={2} color="error">
            <img
              width={20}
              src={notificationIcon}
              alt="NotificationIcon"
              style={{ transition: 'filter 0.3s, transform 0.3s' }}
            />
          </Badge>
        </IconButton>
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            fkexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            marginLeft: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'secondary.main',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            AS
          </Avatar>
          {isLargeDown && (
            <>
              <Typography sx={{ ml: 1.5, fontWeight: 600, fontSize: 14 }}>Adrian Stefan</Typography>
              <KeyboardArrowDownIcon sx={{ width: 16, height: 16, ml: 1.5, color: '#67ADB9' }} />
            </>
          )}
        </Box>
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuHeader>
            <Typography variant="subtitle1" color="notifications.header" sx={{ fontWeight: 600 }}>
              Adrian Stefan
            </Typography>
            <Typography variant="body2" color="notifications.subheader">
              adrian@mrfertility.co.za
            </Typography>
          </MenuHeader>
          <Divider />
          <MenuItems>
            <MenuItem sx={{ borderRadius: 1, mx: 1, py: 1 }} onClick={() => navigate('/profile')}>
              <Typography
                variant="subtitle2"
                color="notifications.header"
                sx={{ ineHeight: '22px' }}
              >
                Profile
              </Typography>
            </MenuItem>
            <Divider sx={{ m: 0 }} />
            <MenuItem sx={{ borderRadius: 1, mx: 1, py: 1 }}>
              <Typography
                variant="subtitle2"
                color="notifications.header"
                sx={{ lineHeight: '22px' }}
              >
                Logout
              </Typography>
            </MenuItem>
          </MenuItems>
        </StyledMenu>
        <NotificationsPanel anchorEl={notificationAnchorEl} onClose={handleNotificationClose} />
      </Toolbar>
    </StyledAppBar>
  );
};
