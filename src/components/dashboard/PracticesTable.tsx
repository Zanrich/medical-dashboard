import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  styled,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  Theme,
  Switch,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/trash.png';

interface Practice {
  name: string;
  tel: string;
  email: string;
  dateCreated: string;
  status: 'active' | 'disabled';
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const StatusSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#67ADB9',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#67ADB952',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#9D9D9D',
  },
  '& .MuiSwitch-switchBase': {
    color: '#F5F5F5',
  },
}));

const ActionButton = styled(IconButton)(() => ({
  padding: 6,
  '& svg': {
    fontSize: '1.25rem',
    color: '#67ADB9',
  },
}));

const StyledStatusCell = ({ status }: { status: 'active' | 'disabled' }) => {
  const [isChecked, setIsChecked] = useState(status === 'active');

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <StatusSwitch checked={isChecked} onChange={handleToggle} />
      <Typography sx={{ ml: 1, color: 'notifications.header' }}>
        {isChecked ? 'Active' : 'Disabled'}
      </Typography>
    </Box>
  );
};

export const PracticesTable: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const practices: Practice[] = [
    {
      name: 'Cape Fertility Clinic',
      tel: '+21 794 3956',
      email: 'info@capefertility.co.za',
      dateCreated: '04/10/2021',
      status: 'active',
    },
    {
      name: 'Cape Fertility Clinic',
      tel: '+21 794 3956',
      email: 'info@capefertility.co.za',
      dateCreated: '04/10/2021',
      status: 'active',
    },
    {
      name: 'Cape Fertility Clinic',
      tel: '+21 794 3956',
      email: 'info@capefertility.co.za',
      dateCreated: '04/10/2021',
      status: 'disabled',
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>, practice: Practice) => {
    setAnchorEl(event.currentTarget);
    setSelectedPractice(practice);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewMore = () => {
    setModalOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '28px' }}>
          Newest Practices
        </Typography>
      </Box>
      <StyledTableContainer sx={{ maxWidth: '100%' }}>
        <Table sx={{ width: '100%', fontSize: '14px' }}>
          <TableHead>
            <TableRow sx={{ display: 'flex', mx: 1, backgroundColor: 'grey.100', borderRadius: 4 }}>
              <TableCell
                sx={{ color: 'notifications.subheader', flex: 1, fontWeight: 600, borderBottom: 0 }}
              >
                Practice Name
              </TableCell>
              {isLargeScreen && (
                <>
                  <TableCell
                    sx={{
                      color: 'notifications.subheader',
                      flex: 1,
                      fontWeight: 600,
                      borderBottom: 0,
                    }}
                  >
                    Tel No
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'notifications.subheader',
                      flex: 1,
                      fontWeight: 600,
                      borderBottom: 0,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'notifications.subheader',
                      flex: 1,
                      fontWeight: 600,
                      borderBottom: 0,
                    }}
                  >
                    Date Created
                  </TableCell>
                  <TableCell
                    sx={{
                      color: 'notifications.subheader',
                      flex: 1,
                      fontWeight: 600,
                      borderBottom: 0,
                    }}
                  >
                    Status
                  </TableCell>
                </>
              )}
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: 'notifications.subheader', borderBottom: 0 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {practices.map((practice, index) => (
              <TableRow key={index} sx={{ display: 'flex', mx: 1 }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: 'notifications.header', flex: 1, borderBottom: 0 }}
                >
                  {practice.name}
                </TableCell>
                {isLargeScreen && (
                  <>
                    <TableCell sx={{ color: 'notifications.header', flex: 1, borderBottom: 0 }}>
                      {practice.tel}
                    </TableCell>
                    <TableCell sx={{ color: 'notifications.header', flex: 1, borderBottom: 0 }}>
                      {practice.email}
                    </TableCell>
                    <TableCell sx={{ color: 'notifications.header', flex: 1, borderBottom: 0 }}>
                      {practice.dateCreated}
                    </TableCell>
                    <TableCell sx={{ color: 'notifications.header', flex: 1, borderBottom: 0 }}>
                      <StyledStatusCell status={practice.status} />
                    </TableCell>
                  </>
                )}
                <TableCell align="right" sx={{ borderBottom: 0 }}>
                  {isLargeScreen ? (
                    <>
                      <ActionButton size="small">
                        <img width={20} src={EditIcon} alt="Edit" />
                      </ActionButton>
                      <ActionButton size="small">
                        <img width={20} src={DeleteIcon} alt="Delete" />
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={(e) => handleClick(e, practice)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleViewMore}>View More</MenuItem>
                        <MenuItem>
                          {' '}
                          <img
                            width={16}
                            src={EditIcon}
                            style={{ marginRight: '5px' }}
                            alt="Edit"
                          />{' '}
                          Edit
                        </MenuItem>
                        <MenuItem>
                          {' '}
                          <img
                            width={16}
                            src={DeleteIcon}
                            style={{ marginRight: '5px' }}
                            alt="Delete"
                          />{' '}
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Box
        onClick={() => navigate('/practices')}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderTop: 1,
          borderColor: ' #9D9D9D3D',
        }}
      >
        <Typography
          sx={{
            color: '#5F97A0',
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 600,
          }}
        >
          See All
        </Typography>
        <KeyboardArrowRightIcon sx={{ width: 18, height: 18, ml: 1, color: '#5F97A0' }} />
      </Box>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Practice Details</DialogTitle>
        <DialogContent>
          {selectedPractice && (
            <>
              <Typography>
                <strong>Name:</strong> {selectedPractice.name}
              </Typography>
              <Typography>
                <strong>Tel:</strong> {selectedPractice.tel}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedPractice.email}
              </Typography>
              <Typography>
                <strong>Date Created:</strong> {selectedPractice.dateCreated}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedPractice.status}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
