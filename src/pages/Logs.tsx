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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import { Search, Info, CheckCircle, Error, Warning } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/animations/PageTransition';
import { FadeIn } from '../components/animations/FadeIn';

interface Log {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'success' | 'error' | 'warning';
  details: string;
}

const StatusChip = styled(Chip)<{ status: 'success' | 'error' | 'warning' }>(
  ({ theme, status }) => ({
    borderRadius: 16,
    height: 24,
    fontSize: '0.75rem',
    fontWeight: 600,
    ...(status === 'success' && {
      backgroundColor: '#E9FCD4',
      color: '#54D62C',
    }),
    ...(status === 'error' && {
      backgroundColor: '#FFE7D9',
      color: '#FF4842',
    }),
    ...(status === 'warning' && {
      backgroundColor: '#FFF7CD',
      color: '#FFC107',
    }),
  })
);

const MotionTableRow = motion(TableRow);

const getStatusIcon = (status: 'success' | 'error' | 'warning') => {
  switch (status) {
    case 'success':
      return <CheckCircle fontSize="small" sx={{ color: '#54D62C' }} />;
    case 'error':
      return <Error fontSize="small" sx={{ color: '#FF4842' }} />;
    case 'warning':
      return <Warning fontSize="small" sx={{ color: '#FFC107' }} />;
    default:
      return undefined;
  }
};

const Logs: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  // Mock data
  const generateLogs = (): Log[] => {
    const actions = [
      'User Login',
      'User Logout',
      'Create Practice',
      'Update Practice',
      'Delete Practice',
      'View Patient',
      'Update Patient',
      'Create Treatment',
      'Complete Treatment',
      'System Backup',
    ];

    const users = ['Adrian Stefan', 'John Smith', 'Emma Johnson', 'Michael Brown', 'System'];

    const statuses: ('success' | 'error' | 'warning')[] = ['success', 'error', 'warning'];

    return Array.from({ length: 50 }, (_, i) => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // Generate a random date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      return {
        id: `LOG-${1000 + i}`,
        timestamp: date.toLocaleString(),
        user,
        action,
        status,
        details: `Details for ${action.toLowerCase()} operation`,
      };
    });
  };

  const logs = generateLogs();

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;

    return matchesSearch && matchesStatus && matchesAction;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));

  return (
    <PageTransition>
      <Box sx={{ p: 3 }}>
        <FadeIn duration={0.6}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            System Logs
          </Typography>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <Paper sx={{ mb: 3, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search logs..."
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
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="error">Error</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="action-filter-label">Action</InputLabel>
                  <Select
                    labelId="action-filter-label"
                    value={actionFilter}
                    label="Action"
                    onChange={(e) => setActionFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Actions</MenuItem>
                    {uniqueActions.map((action) => (
                      <MenuItem key={action} value={action}>
                        {action}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </FadeIn>

        <FadeIn delay={0.4} duration={0.6}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Log ID</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <MotionTableRow
                        key={log.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.3 }}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {log.id}
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <StatusChip
                            icon={getStatusIcon(log.status)}
                            label={log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            status={log.status}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title={log.details}>
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              size="small"
                            >
                              <Info fontSize="small" sx={{ color: '#67ADB9' }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </MotionTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredLogs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </FadeIn>
      </Box>
    </PageTransition>
  );
};

export default Logs;
