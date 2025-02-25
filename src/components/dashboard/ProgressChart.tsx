import React from 'react';
import { Box, Typography, CircularProgress, styled, Grid, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

interface ProcessItemProps {
  label: string;
  value: number;
  color: string;
}

const progressAnimation = keyframes`
  from {
    stroke-dasharray: 0 100;
  }
`;

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: 'relative',
  '& .MuiCircularProgress-circle': {
    animation: `${progressAnimation} 1s ease-out forwards`,
    strokeLinecap: 'round',
  },
}));

const ProcessItem: React.FC<ProcessItemProps> = ({ label, value, color }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // width: '229px'
        gap: 5,
        [theme.breakpoints.down('md')]: {
          justifyContent: 'flex-start',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={4}
          sx={{
            color: (theme) => theme.palette.grey[200],
            position: 'absolute',
          }}
        />
        <StyledCircularProgress
          variant="determinate"
          value={value}
          size={80}
          thickness={4}
          sx={{
            color: color,
            transform: 'rotate(-90deg)',
          }}
        />
        <Typography
          variant="caption"
          color='notifications.header'
          sx={{
            position: 'absolute',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '22px',
          }}
        >
          {`${value}%`}
        </Typography>
      </Box>
      <Box sx={{width: '110px'}}>
        <Typography
            variant="body2"
            sx={{
              color: 'notifications.header',
              fontSize: '24px',
              fontWeight: 700,
              fontHeight: '36px',
            }}
          >
           {`${value}%`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pt: 0.5,
              color: 'notifications.subheader',
              fontSize: '14px',
              lineHeight: '22px',
            }}
          >
            {label}
          </Typography>
      </Box>
    </Box>
  );
};

export const ProcessChart: React.FC = () => {
     const theme = useTheme();
  const processes = [
    { label: 'Pending', value: 24, color: '#FF966B' },
    { label: 'Registered', value: 56, color: '#54D62C' },
    { label: 'Post Treatment', value: 20, color: '#1890FF' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        py: 4.75,
        px: 3,
        mt: 3.25,
        // gap: 4,
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: '0px 12px 24px -4px #919EAB1F',
      }}
    >
          <Grid 
            container 
            spacing={3} 
            sx={{
              // display: 'flex',
              // justifyContent: 'space-around',
              // alignItems: 'center',
              // p: 3,
              // // gap: 4,
              // width: '100%',
              // bgcolor: 'background.paper',
              // borderRadius: 4,
              // boxShadow: '0px 12px 24px -4px #919EAB1F',
              '& .MuiGrid-item': {
              width: '100%',
              [theme.breakpoints.down('md')]: {
                maxWidth: '100%',
                flexBasis: '100%',
              },
          },
            }}>
              {processes.map((process, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ProcessItem
                    key={index}
                    label={process.label}
                    value={process.value}
                    color={process.color}
                  />
              </Grid>
            ))}
          </Grid>
          </Box>
          //   <Grid item xs={12}>
          //     <ProcessChart  />
          //   </Grid>
          // </Grid>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     p: 3,
    //     gap: 4,
    //     width: '100%',
    //     bgcolor: 'background.paper',
    //     borderRadius: 4,
    //     boxShadow: '0px 12px 24px -4px #919EAB1F',
    //   }}
    // >
      // {processes.map((process, index) => (
      //   <ProcessItem
      //     key={index}
      //     label={process.label}
      //     value={process.value}
      //     color={process.color}
      //   />
      // ))}
    // </Box>
  );
};