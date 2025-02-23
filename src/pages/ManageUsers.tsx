import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { UserForm } from '../components/forms/UserForm';

export const ManageUsers: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 1 },
      { field: 'status', headerName: 'Status', flex: 1 },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
          <Box>
            <Button size="small" onClick={() => console.log('Edit:', params.row)}>
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => console.log('Delete:', params.row)}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  const rows = useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Doctor',
        status: 'Active',
      },
      // Add more rows...
    ],
    []
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Manage Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add User
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
        />
      </Card>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <UserForm onSubmit={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};