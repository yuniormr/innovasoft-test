import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNotification } from '../hooks/useNotification';

export default function Notification() {
  const { open, message, severity, hideNotification } = useNotification();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={hideNotification}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
