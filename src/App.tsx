import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { AppLayout } from './components/common/AppLayout';
import { PracticeProvider } from './store/PracticeContext';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ManagePractices } from './pages/ManagePractices';
import { ManageUsers } from './pages/ManageUsers';
import { ManagePatients } from './pages/ManagePatients';
import { MyProfile } from './pages/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PracticeProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/practices" element={<ManagePractices />} />
              <Route path="/users" element={<ManageUsers />} />
              <Route path="/patients" element={<ManagePatients />} />
            </Routes>
          </AppLayout>
        </PracticeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;