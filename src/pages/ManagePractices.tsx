import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { usePractice } from '../store/PracticeContext';
import { useNavigate } from 'react-router-dom';

interface Practice {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

const mockPractices: Practice[] = [
  {
    id: '1',
    name: 'Cape Fertility Clinic',
    address: '123 Main Street, Cape Town',
    phone: '+27 794 3956',
    email: 'info@capefertility.co.za',
    status: 'active',
  },
  // Add more mock practices as needed
];

export const ManagePractices: React.FC = () => {
  const { setSelectedPractice } = usePractice();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handlePracticeSelect = (practice: Practice) => {
    setSelectedPractice({
      id: practice.id,
      name: practice.name,
    });
    navigate('/dashboard');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Manage Practices</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Practice
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockPractices.map((practice) => (
          <Grid item xs={12} sm={6} md={4} key={practice.id}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
              onClick={() => handlePracticeSelect(practice)}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {practice.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {practice.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {practice.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {practice.email}
                  </Typography>
                </Box>
                <Box>
                  <IconButton size="small" onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Practice</DialogTitle>
        <DialogContent>
          {/* Add practice form here */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};