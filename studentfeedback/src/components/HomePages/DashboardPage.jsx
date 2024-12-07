import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Dashboard. Here you can see an overview of the system.
      </Typography>
    </Box>
  );
};

export default DashboardPage;
