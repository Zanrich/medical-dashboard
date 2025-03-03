import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { theme } from './theme/theme';
import { AppLayout } from './components/common/AppLayout';
import { PracticeProvider } from './store/PracticeContext';
import { Dashboard } from './pages/Dashboard';
import { ManagePractices } from './pages/ManagePractices';
import Users from './pages/ManageUsers';
import Patients from './pages/ManagePatients';
import { MyProfile } from './pages/MyProfile';
import Logs from './pages/Logs';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        z
        <CssBaseline />
        <PracticeProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/practices" element={<ManagePractices />} />
              <Route path="/users" element={<Users />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </AppLayout>
        </PracticeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
