import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface Notification {
  id: number;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface NotificationToastProps {
  notifications: Notification[];
  removeNotification: (id: number) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notifications,
  removeNotification,
}) => {
  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => removeNotification(notification.id)}
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationToast;
