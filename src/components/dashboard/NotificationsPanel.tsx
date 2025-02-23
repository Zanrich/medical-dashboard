import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Notification } from '@/types';

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  open,
  onClose,
}) => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Registration',
      user: {
        name: 'Alex Fredricks',
        avatar: '/path-to-avatar',
      },
      timestamp: '07 Oct 2022',
      read: false,
    },
    {
      id: '2',
      title: 'New Consent Added',
      user: {
        name: 'Blake Robertson',
        avatar: '/path-to-avatar',
      },
      timestamp: '07 Oct 2022',
      read: false,
    },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Notifications</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" color="textSecondary" mb={2}>
          You have {notifications.length} unread messages
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} divider>
              <ListItemAvatar>
                <Avatar src={notification.user.avatar}>{notification.user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {notification.user.name}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="textSecondary">
                      {notification.timestamp}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Button fullWidth variant="text" sx={{ mt: 2 }}>
          Clear All
        </Button>
      </Box>
    </Drawer>
  );
};