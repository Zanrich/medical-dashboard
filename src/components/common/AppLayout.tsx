import React from 'react';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const LayoutContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: 64, // Header height
  marginLeft: 0, // Sidebar width
  [theme.breakpoints.down('lg')]: { // Changed from 'md' to 'lg'
    marginLeft: 0,
  },
}));

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isLargeDown = useMediaQuery(theme.breakpoints.down('lg')); // Added for lg breakpoint

  return (
    <LayoutRoot>
      <Header />
      <Sidebar />
      <LayoutContent 
        sx={{
          pt: isLargeDown ? '56px' : '64px', // Add extra top padding for mobile to account for burger menu
        }}
      >
        {children}
      </LayoutContent>
    </LayoutRoot>
  );
};