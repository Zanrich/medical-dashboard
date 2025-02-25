import React, { useMemo } from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import { StatsCard } from '../components/dashboard/StarsCard';
import { ProcessChart } from '../components/dashboard/ProgressChart';
import { PracticesTable } from '../components/dashboard/PracticesTable';
import { Practice } from '@/types';
import  Stethoscope  from '../assets/icons/dr.png';
import   Pram   from '../assets/icons/pram.png';
import  Plaster  from '../assets/icons/plaster.png';
import Signature from '../assets/icons/sign.png';
import Bulb from '../assets/icons/bulp.png';

export const Dashboard: React.FC = () => {
   const theme = useTheme();
  const stats = useMemo(() => [
    { title: 'Total Practices', value: '11', increase: '+15%', icon: <img width={32} height={32} src={Stethoscope} alt="StethoscopeIcon"/>},
    { title: 'Total Subscribers', value: '261', increase: '+15%' , icon: <img width={32} height={32} src={Pram} alt="PramIcon"/>},
    { title: 'Total Treatments', value: '135', increase: '+15%', icon: <img width={32} height={32} src={Plaster} alt="PlasterIcon"/> },
    { title: 'Total Consents', value: '135', increase: '+15%', icon: <img width={32} height={32} src={Signature} alt="SignatureIcon"/> },
    { title: 'Total Consents signed', value: '2159', increase: '+15%', icon: <img width={32} height={32} src={Signature} alt="SignatureIcon"/> },
    { title: 'Total Fact sheets read', value: '2159', increase: '+15%', icon: <img width={32} height={32} src={Bulb} alt="BulbIcon"/> },
  ], []);

  const progressData = useMemo(() => [
    { name: 'Pending', value: 24, color: '#ff966b' },
    { name: 'Registered', value: 56, color: '#54d62c' },
    { name: 'Post Treatment', value: 20, color: '#1890ff' },
  ], []);

  const practices: Practice[] = useMemo(() => [
    {
      id: '1',
      name: 'Cape Fertility Clinic',
      telephone: '+21 794 3956',
      email: 'info@capefertility.co.za',
      dateCreated: '04/10/2021',
      status: 'active',
    },
    // Add more practices...
  ], []);

  return (
    <Box 
      sx={{ 
        px: 5, 
        py: 4,
        [theme.breakpoints.down('lg')]: {
          p: 1.25,
        },
      
      }}>
      <Typography variant="h4" gutterBottom color='notifications.header' sx={{fontWeight: 700, fontSize: '20px', lineHeight: '30px'}}>
        Welcome Andrew!
      </Typography>
      <Typography color="textSecondary" component='p'  sx={{fontSize: '14px', lineHeight: '22px', pb: 5}}>
        Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eleifend laoreet.
      </Typography>

      <Grid 
        container 
        spacing={3}
        sx={{
          '& .MuiGrid-item': {
            width: '100%',
            [theme.breakpoints.down('md')]: {
              maxWidth: '100%',
              flexBasis: '100%',
            },
          },
        }}
      >
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* <Grid container spacing={3} sx={{ pt: 3.25 }}>
        <Grid item xs={12}> */}
          <ProcessChart  />
        {/* </Grid>
      </Grid> */}

      <Box sx={{ pt: 4 }}>
        <PracticesTable />
      </Box>
    </Box>
  );
};