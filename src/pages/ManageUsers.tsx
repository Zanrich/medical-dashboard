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
  Switch,
  FormControlLabel,
  Divider,
  styled,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Security,
  Work,
  Email,
  Phone,
  CalendarToday,
  VerifiedUser,
  Block,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { PageTransition } from '../components/animations/PageTransition';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggeredFadeIn } from '../components/animations/StaggeredFadeIn';

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'nurse';
  practice: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  dateCreated: string;
}

const StatusChip = styled(Chip)<{ status: 'active' | 'inactive' }>(({ theme, status }) => ({
  borderRadius: 16,
  height: 24,
  fontSize: '0.75rem',
  fontWeight: 600,
  ...(status === 'active' && {
    backgroundColor: '#E9FCD4',
    color: '#54D62C',
  }),
  ...(status === 'inactive' && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[600],
  }),
}));

const RoleChip = styled(Chip)<{ role: 'admin' | 'doctor' | 'receptionist' | 'nurse' }>(
  ({ theme, role }) => ({
    borderRadius: 16,
    height: 24,
    fontSize: '0.75rem',
    fontWeight: 600,
    ...(role === 'admin' && {
      backgroundColor: '#D0F2FF',
      color: '#1890FF',
    }),
    ...(role === 'doctor' && {
      backgroundColor: '#FFF7CD',
      color: '#FFC107',
    }),
    ...(role === 'receptionist' && {
      backgroundColor: '#FFE7D9',
      color: '#FF4842',
    }),
    ...(role === 'nurse' && {
      backgroundColor: '#E4F7F9',
      color: '#67ADB9',
    }),
  })
);

const UserCard = styled(motion.div)(({ theme }) => ({
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

const Users: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showInactive, setShowInactive] = useState(false);

  // Mock data
  const generateUsers = (): User[] => {
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
    const roles: ('admin' | 'doctor' | 'receptionist' | 'nurse')[] = [
      'admin',
      'doctor',
      'doctor',
      'receptionist',
      'nurse',
    ];
    const statuses: ('active' | 'inactive')[] = ['active', 'active', 'active', 'inactive'];

    return Array.from({ length: 30 }, (_, i) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const role = roles[Math.floor(Math.random() * roles.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const practice = practices[Math.floor(Math.random() * practices.length)];

      const lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - Math.floor(Math.random() * 30));

      const creationDate = new Date();
      creationDate.setDate(creationDate.getDate() - Math.floor(Math.random() * 365));

      return {
        id: `USR-${1000 + i}`,
        name,
        avatar: `/placeholder.svg?height=40&width=40&text=${firstName.charAt(0)}${lastName.charAt(0)}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${practice.toLowerCase().replace(/\s+/g, '')}.co.za`,
        phone: `+27 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        role,
        practice,
        status,
        lastLogin: lastLoginDate.toLocaleString(),
        dateCreated: creationDate.toLocaleDateString(),
      };
    });
  };

  const users = generateUsers();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesInactive = showInactive || user.status === 'active';

    return matchesSearch && matchesRole && matchesStatus && matchesInactive;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageTransition>
      <Box sx={{ p: 3 }}>
        <FadeIn duration={0.6}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Users
            </Typography>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<Add />}
              sx={{ borderRadius: 2 }}
            >
              Add User
            </Button>
          </Box>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <Paper sx={{ mb: 3, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search users..."
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
              <Grid item xs={6} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  size="small"
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="receptionist">Receptionist</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={2}>
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
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showInactive}
                      onChange={(e) => setShowInactive(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Show Inactive"
                />
              </Grid>
              <Grid item xs={6} md={2}>
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
          </Paper>
        </FadeIn>

        {viewMode === 'list' ? (
          <FadeIn delay={0.4} duration={0.6}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Practice</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user, index) => (
                        <motion.tr
                          key={user.id}
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
                                src={user.avatar}
                                alt={user.name}
                                sx={{ mr: 2, width: 32, height: 32 }}
                              />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {user.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>
                            <RoleChip
                              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              role={user.role}
                            />
                          </TableCell>
                          <TableCell>{user.practice}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <StatusChip
                              icon={
                                user.status === 'active' ? (
                                  <VerifiedUser fontSize="small" />
                                ) : (
                                  <Block fontSize="small" />
                                )
                              }
                              label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              status={user.status}
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
                              <Security fontSize="small" />
                            </IconButton>
                            <IconButton
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              size="small"
                              color="error"
                            >
                              <Delete fontSize="small" />
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
                count={filteredUsers.length}
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
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <UserCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">{user.name}</Typography>
                          <Box sx={{ display: 'flex', mt: 0.5 }}>
                            <RoleChip
                              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              role={user.role}
                              size="small"
                            />
                            <Box sx={{ ml: 1 }}>
                              <StatusChip
                                label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                status={user.status}
                                size="small"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      <CardContent>
                        <InfoItem>
                          <Email fontSize="small" />
                          <Typography variant="body2">{user.email}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <Phone fontSize="small" />
                          <Typography variant="body2">{user.phone}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <Work fontSize="small" />
                          <Typography variant="body2">{user.practice}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <CalendarToday fontSize="small" />
                          <Typography variant="body2">Created: {user.dateCreated}</Typography>
                        </InfoItem>
                        <InfoItem>
                          <CalendarToday fontSize="small" />
                          <Typography variant="body2">Last login: {user.lastLogin}</Typography>
                        </InfoItem>
                      </CardContent>
                      <Box
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
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
                        >
                          Edit
                        </Button>
                        <Button
                          component={motion.button}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          variant="contained"
                          size="small"
                          startIcon={<Security />}
                        >
                          Permissions
                        </Button>
                      </Box>
                    </UserCard>
                  </Grid>
                ))}
            </Grid>
          </StaggeredFadeIn>
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
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

export default Users;
