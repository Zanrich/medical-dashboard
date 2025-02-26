import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  styled,
  Popover,
  Button,
  Divider,
} from '@mui/material';
import { Clock3 } from 'lucide-react';

import ProfilePicture from '../../assets/images/profilePicture.jpeg';
import trashIcon from '../../assets/icons/greybin.png';
import NotificationToast from '../common/NotificationToast';

interface Notification {
  id: number;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(3),
    width: 360,
    borderRadius: '12px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
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

interface NotificationsPanelProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a new notification
  const addNotification = (message: string, severity: Notification['severity']) => {
    setNotifications((prev) => [
      ...prev,
      { id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0, message, severity },
    ]);
  };

  // Function to remove a notification when it closes
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const notificationMessages = [
    {
      id: '1',
      type: 'New Registration',
      user: {
        name: 'Alex Fredricks',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      timestamp: '07 Oct 2022',
    },
    {
      id: '2',
      type: 'New Constent Added',
      user: {
        name: 'Blake Robertson',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      timestamp: '07 Oct 2022',
    },
  ];

  return (
    <>
      <StyledPopover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ pt: 2 }}>
          <Typography
            variant="subtitle1"
            color="notifications.header"
            sx={{ px: 2.5, fontWeight: 600 }}
          >
            Notifications
          </Typography>
          <Typography variant="body2" color="notifications.subheader" sx={{ px: 2.5, mb: 2 }}>
            You have 2 unread messages
          </Typography>
          <Divider />
          <Box sx={{ mb: 0 }}>
            {notificationMessages.map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  py: 1,
                  px: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Avatar
                  src={ProfilePicture ? ProfilePicture : notification.user.avatar}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box sx={{ flex: 1, py: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="notifications.header"
                    sx={{ fontWeight: 600, lineHeight: '22px' }}
                  >
                    {notification.type}
                  </Typography>
                  <Typography variant="body2" color="notifications.subheader" sx={{ mb: 0.5 }}>
                    {notification.user.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Clock3
                      size={16}
                      color={'#BCBCBC'}
                      style={{
                        marginRight: '4px',
                        marginTop: '1px',
                        marginBottom: '1px',
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="notifications.time"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: '18px',
                        fontSize: '12px',
                      }}
                    >
                      {notification.timestamp}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => addNotification('Item deleted!', 'error')}
                  sx={{ color: 'text.secondary' }}
                >
                  <img width={20} src={trashIcon || '/placeholder.svg'} alt="TrashIcon" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Divider />
          <Button
            fullWidth
            color="primary"
            sx={{
              justifyContent: 'center',
              color: 'text.subtext',
              lineHeight: '22px',
              height: '34px',
              m: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'primary.dark',
              },
            }}
            onClick={() => {
              onClose();
            }}
          >
            Clear All
          </Button>
        </Box>
      </StyledPopover>
      <NotificationToast notifications={notifications} removeNotification={removeNotification} />
    </>
  );
};
