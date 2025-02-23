import React from 'react';
import { Box, styled } from '@mui/material';
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
//   paddingLeft: 280, // Sidebar width
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
  },
}));

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <LayoutRoot>
      <Header />
      <Sidebar />
      <LayoutContent>{children}</LayoutContent>
    </LayoutRoot>
  );
};