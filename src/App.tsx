import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppLayout } from './components/common/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { MyProfile } from './pages/MyProfile';
import { ManageUsers } from './pages/ManageUsers';
import { ManagePatients } from './pages/ManagePatients';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/users" element={<ManageUsers />} />
              <Route path="/patients" element={<ManagePatients />} />
            </Routes>
          </AppLayout>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;