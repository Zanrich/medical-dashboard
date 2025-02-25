import React from 'react';
import { Box, Card, Typography, styled } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  increase: string;
  icon?: React.ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const IncreaseIndicator = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 4px',
  borderRadius: 20,
  width: 24,
  height: 24,
  backgroundColor: '#EAFBE7',
  marginRight: 8,
  '& svg': {
    width: 16,
    height: 16,
    color: '#54D62C',
    
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '56px', // Force exact width
  height: '56px', // Force exact height
  minWidth: '56px', // Prevent shrinking
  minHeight: '56px', // Prevent shrinking
  borderRadius: '50%',
  backgroundColor: '#E4F7F9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  flexShrink: 0, // Prevent shrinking
  '& img': {
    width: 32,
    height: 32,
  },
}));

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  increase,
  icon,
}) => {
  return (
    <StyledCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{mr: 2}}>
          <Typography
            variant="subtitle1"
            color='notifications.header'
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '22px',
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 0.5 }}>
            <IncreaseIndicator>
              <TrendingUp />
            </IncreaseIndicator>
            <Typography
            color='notifications.header'
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '22px'
              }}
            >
              {increase}
            </Typography>
          </Box>

          <Typography
            variant="h3"
            color='notifications.header'
            sx={{
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: '48px',
            }}
          >
            {value}
          </Typography>
        </Box>
        <IconContainer>
          {icon}
        </IconContainer>
      </Box>
    </StyledCard>
  );
};