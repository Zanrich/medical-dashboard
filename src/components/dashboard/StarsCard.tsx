import React from 'react';
import { Card, CardContent, Typography, Box, styled } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { fadeIn } from '../../utils/animations';

const StyledCard = styled(Card)({
  animation: `${fadeIn} 0.5s ease-in-out`,
});

interface StatsCardProps {
  title: string;
  value: string | number;
  increase: string;
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  increase,
  icon = <TrendingUp />,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h4">{value}</Typography>
              <Typography color="success.main" variant="body2">
                {increase}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              p: 1.5,
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};