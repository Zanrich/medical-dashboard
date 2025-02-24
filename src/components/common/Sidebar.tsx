import React, {useState} from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import {
  Dashboard,
  Person,
  Business,
  Description,
  People,
  LocalHospital,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePractice } from '../../store/PracticeContext';
import homeIcon from'../../assets/icons/home.png';
import profileIcon from '../../assets/icons/profile.png';
import mediKitIcon from '../../assets/icons/medkit.png';
import internalIcon from '../../assets/icons/InternalIcon.png';
import logIcon from '../../assets/icons/logs.png';
import usersIcon from '../../assets/icons/users.png';
import patientIcon from '../../assets/icons/folder.png';


const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.grey[200]}`,
  },
}));

const getMenuItems = (selectedPractice: boolean) => [
  { text: 'Dashboard', icon: <img  width={22} src={homeIcon} alt="HomeIcon"/>, path: '/' },
  { text: 'My Profile', icon: <img  width={22}src={profileIcon} alt="ProfileIcon"/>, path: '/profile' },
   ...(selectedPractice
    ? [
       { text: 'Manage Users', icon: <img  width={22}src={usersIcon} alt="ManageUsersIcon"/>, path: '/users' },
       { text: 'Manage Patients', icon: <img width={22}  src={patientIcon} alt="ManagePatientsIcon"/>, path: '/patients' },
      ]
    : [{ text: 'Manage Practices', icon: <img width={22} src={mediKitIcon} alt="MediKitIcon"/>, path: '/practices' }]),
  { text: 'Logs', icon: <img  width={22} src={logIcon} alt="LogsIcons"/>, path: '/logs' },
];

export const Sidebar: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
     const { selectedPractice, clearSelectedPractice } = usePractice();
    const handleListItemClick = (text: string) => {
        setSelectedItem(text);
    };
    
  const handleNavigation = (path: string) => {
    // Clear selected practice when navigating to non-practice routes
    if (path !== '/users' && path !== '/patients' && path !== '/dashboard') {
      clearSelectedPractice();
    }
    navigate(path);
  };

  const menuItems = getMenuItems(!!selectedPractice);

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p: 2.5 }}>
        {/* <img src={require('../../assets/images/Logo.png')} alt="Logo" style={{ width: 88.12, height: 40 }} /> */}
         <Box 
          component="img" 
          src={require('../../assets/images/Logo.png')}
          alt="Logo" 
          sx={{ 
            width: 88.12, 
            height: 40,
            mb: 1.125,
            p: 0,
            cursor: 'pointer' 
          }}
          onClick={() => {
            clearSelectedPractice();
            navigate('/');
          }}
        />
		
      </Box>
      {selectedPractice && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 2,
              mb: 2,
              px:'20px',
              py: '18px',
              bgcolor: `linear-gradient(0deg, #FFFFFF, rgba(157, 157, 157, 0.08))`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover img': {
                filter: 'invert(1) brightness(2)', // Invert the colors and brighten to simulate a transition to white
                transform: 'scale(1.1)', // Optional: scaling effect for the image
              },
              '&:hover': {
                bgcolor: 'primary.main',
                '& .MuiTypography-root': {
                  color: 'common.white',
                },
              },
            }}
            onClick={() => navigate('/practices')}
          >
             <img width={24} src={internalIcon} alt="MediKitIcon"  style={{ transition: 'filter 0.3s, transform 0.3s', marginTop: '8px', marginBottom: '8px' }}/>
             
            <Typography 
              variant="subtitle1" 
              color="primary.main"
              sx={{ transition: 'all 0.2s ease-in-out', fontWeight: 600, lineHeight: '24px', ml: 2, my: 1}}
            >
              {selectedPractice.name}
            </Typography>
          </Box>
        )}
      <List  sx={{ pt: 0}} >
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            sx={{pt: 0, pb: 0.5,}} 
            alignItems={'flex-start'}>
            <ListItemButton
           selected={location.pathname === item.path}
            disableGutters
           onClick={() => handleNavigation(item.path)}
            sx={{
                padding: 0,
                height: 48,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  borderRadius: 2,
                },
              },
            }}>
                <ListItemIcon sx={{ color: 'primary.main', py: '13px', px: '16px'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}  primaryTypographyProps={{style: { fontSize: 14, fontWeight: 600, lineHeight: '22px', color: selectedItem === item.text ? '#578388' : '#414141'}}} />
            </ListItemButton>
          </ListItem>
        ))} 
      </List>
    </StyledDrawer>
  );
};