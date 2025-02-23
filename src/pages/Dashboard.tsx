import React, { useMemo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { StatsCard } from '../components/dashboard/StarsCard';
import { ProgressChart } from '../components/dashboard/ProgressChart';
import { PracticesTable } from '../components/dashboard/PracticesTable';
import { Practice } from '@/types';

export const Dashboard: React.FC = () => {
  const stats = useMemo(() => [
    { title: 'Total Practices', value: '11', increase: '+15%' },
    { title: 'Total Subscribers', value: '261', increase: '+15%' },
    { title: 'Total Treatments', value: '135', increase: '+15%' },
    { title: 'Total Consents', value: '135', increase: '+15%' },
    { title: 'Total Consents signed', value: '2159', increase: '+15%' },
    { title: 'Total Fact sheets read', value: '2159', increase: '+15%' },
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome Andrew!
      </Typography>
      <Typography color="textSecondary" paragraph>
        Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eleifend laoreet.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <ProgressChart data={progressData} />
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h6" gutterBottom>
          Newest Practices
        </Typography>
        <PracticesTable
          practices={practices}
          onEdit={(practice) => console.log('Edit:', practice)}
          onDelete={(practice) => console.log('Delete:', practice)}
        />
      </Box>
    </Box>
  );
};