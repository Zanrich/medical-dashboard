import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Grid
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNotifications } from '../hooks/useNotifications';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: 'active' | 'inactive';
}

export const ManagePatients: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { notifications } = useNotifications();

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'phone', headerName: 'Phone', flex: 1 },
      { field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1 },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params) => (
          <Box
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 1,
              bgcolor: params.value === 'active' ? 'success.light' : 'error.light',
              color: params.value === 'active' ? 'success.dark' : 'error.dark',
            }}
          >
            {params.value}
          </Box>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
          <Box>
            <IconButton
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{ color: 'primary.main' }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const rows = useMemo(
    () => [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+27 123 4567',
        dateOfBirth: '1990-01-01',
        status: 'active',
      },
      // Add more mock data as needed
    ],
    []
  );

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete patient:', id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement form submission
    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Manage Patients</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Patient
        </Button>
      </Box>

      <Card>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[10]}
          autoHeight
          disableRowSelectionOnClick
          sx={{ minHeight: 400 }}
        />
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPatient(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={selectedPatient?.name}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue={selectedPatient?.email}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={selectedPatient?.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  defaultValue={selectedPatient?.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setSelectedPatient(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    {selectedPatient ? 'Update' : 'Save'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};