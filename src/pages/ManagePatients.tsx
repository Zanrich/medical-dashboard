import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Grid,
  CardContent,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  Divider,
  styled,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  CalendarToday,
  Phone,
  Email,
  MedicalServices,
  Assignment,
  ArrowForward,
  Business,
  Event,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { PageTransition } from '../components/animations/PageTransition';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggeredFadeIn } from '../components/animations/StaggeredFadeIn';

interface Patient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  practice: string;
  status: 'active' | 'pending' | 'inactive';
  lastVisit: string;
  upcomingAppointment: string | null;
  treatmentsCount: number;
}

const StatusChip = styled(Chip)<{ status: 'active' | 'pending' | 'inactive' }>(
  ({ theme, status }) => ({
    borderRadius: 16,
    height: 24,
    fontSize: '0.75rem',
    fontWeight: 600,
    ...(status === 'active' && {
      backgroundColor: '#E9FCD4',
      color: '#54D62C',
    }),
    ...(status === 'pending' && {
      backgroundColor: '#FFF7CD',
      color: '#FFC107',
    }),
    ...(status === 'inactive' && {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[600],
    }),
  })
);

const PatientCard = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
}));

const Patients: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const generatePatients = (): Patient[] => {
    const firstNames = [
      'John',
      'Emma',
      'Michael',
      'Olivia',
      'William',
      'Sophia',
      'James',
      'Ava',
      'Benjamin',
      'Isabella',
    ];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Miller',
      'Davis',
      'Garcia',
      'Rodriguez',
      'Wilson',
    ];
    const practices = [
      'Cape Fertility Clinic',
      'Sunshine Medical Center',
      'Oceanview Healthcare',
      'Mountain View Hospital',
    ];
    const statuses: ('active' | 'pending' | 'inactive')[] = [
      'active',
      'active',
      'pending',
      'inactive',
    ];

    return Array.from({ length: 50 }, (_, i) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const practice = practices[Math.floor(Math.random() * practices.length)];

      const lastVisitDate = new Date();
      lastVisitDate.setDate(lastVisitDate.getDate() - Math.floor(Math.random() * 30));

      const hasUpcomingAppointment = Math.random() < 0.7;
      let upcomingAppointment = null;
      if (hasUpcomingAppointment) {
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 14) + 1);
        upcomingAppointment = appointmentDate.toLocaleDateString();
      }

      return {
        id: `PAT-${10000 + i}`,
        name,
        avatar: `/placeholder.svg?height=40&width=40&text=${firstName.charAt(0)}${lastName.charAt(0)}`,
        age: Math.floor(Math.random() * 50) + 18,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        phone: `+27 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        address: `${Math.floor(Math.random() * 100) + 1} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St, Cape Town`,
        practice,
        status,
        lastVisit: lastVisitDate.toLocaleDateString(),
        upcomingAppointment,
        treatmentsCount: Math.floor(Math.random() * 10),
      };
    });
  };

  const patients = generatePatients();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;

    const matchesTab =
      tabValue === 0 ||
      (tabValue === 1 && patient.upcomingAppointment !== null) ||
      (tabValue === 2 &&
        new Date(patient.lastVisit).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000);

    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  return (
    <PageTransition>
      <Box sx={{ p: 3 }}>
        <FadeIn duration={0.6}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
              <Typography variant="h5" gutterBottom component="h1" sx={{ fontWeight: 600 }}>
              Patients
            </Typography>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<Add />}
              sx={{ borderRadius: 2 }}
            >
              Add Patient
            </Button>
          </Box>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="All Patients" />
              <Tab label="Upcoming Appointments" />
              <Tab label="Recent Visits" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant={viewMode === 'list' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('list')}
                      sx={{ mr: 1, minWidth: 0, px: 1 }}
                    >
                      List
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('grid')}
                      sx={{ minWidth: 0, px: 1 }}
                    >
                      Grid
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </FadeIn>

        {viewMode === 'list' ? (
          <FadeIn delay={0.4} duration={0.6}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Practice</TableCell>
                      <TableCell>Last Visit</TableCell>
                      <TableCell>Upcoming Appointment</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPatients
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((patient, index) => (
                        <motion.tr
                          key={patient.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index, duration: 0.3 }}
                          style={{
                            borderBottom: '1px solid rgba(224, 224, 224, 1)',
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                src={patient.avatar}
                                alt={patient.name}
                                sx={{ mr: 2, width: 32, height: 32 }}
                              />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {patient.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {patient.age} years, {patient.gender}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{patient.id}</TableCell>
                          <TableCell>{patient.practice}</TableCell>
                          <TableCell>{patient.lastVisit}</TableCell>
                          <TableCell>{patient.upcomingAppointment || 'None scheduled'}</TableCell>
                          <TableCell>
                            <StatusChip
                              label={
                                patient.status.charAt(0).toUpperCase() + patient.status.slice(1)
                              }
                              status={patient.status}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              size="small"
                              color="primary"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              size="small"
                              color="primary"
                            >
                              <MedicalServices fontSize="small" />
                            </IconButton>
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              size="small"
                              color="primary"
                            >
                              <ArrowForward fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </motion.tr>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredPatients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </FadeIn>
        ) : (
          <StaggeredFadeIn staggerDelay={0.1} initialDelay={0.4} direction="up" distance={20}>
            <Grid container spacing={3}>
              {filteredPatients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <Grid item xs={12} sm={6} md={4} key={patient.id}>
                    <PatientCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={patient.avatar}
                          alt={patient.name}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">{patient.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {patient.age} years, {patient.gender}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider />
                      <CardContent>
                        <Box sx={{ mb: 2 }}>
                          <StatusChip
                            label={patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                            status={patient.status}
                          />
                        </Box>
                        <InfoItem>
                          <Phone fontSize="small" />
                          <Typography variant="body2">{patient.phone}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <Email fontSize="small" />
                          <Typography variant="body2">{patient.email}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <Business fontSize="small" />
                          <Typography variant="body2">{patient.practice}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <CalendarToday fontSize="small" />
                          <Typography variant="body2">Last visit: {patient.lastVisit}</Typography>
                        </InfoItem>
                        {patient.upcomingAppointment && (
                          <InfoItem>
                            <Event fontSize="small" />
                            <Typography variant="body2">
                              Upcoming: {patient.upcomingAppointment}
                            </Typography>
                          </InfoItem>
                        )}
                        <InfoItem>
                          <Assignment fontSize="small" />
                          <Typography variant="body2">
                            {patient.treatmentsCount} treatments
                          </Typography>
                        </InfoItem>
                      </CardContent>
                      <Box
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'flex-end',
                          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        }}
                      >
                        <Button
                          component={motion.button}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          variant="outlined"
                          size="small"
                          startIcon={<Edit />}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          component={motion.button}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          variant="contained"
                          size="small"
                          startIcon={<MedicalServices />}
                        >
                          Treatments
                        </Button>
                      </Box>
                    </PatientCard>
                  </Grid>
                ))}
            </Grid>
          </StaggeredFadeIn>
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredPatients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </PageTransition>
  );
};

export default Patients;
