import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: 200, width: '100%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 2 }}>
        {data.map((item) => (
          <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: item.color,
                mr: 1,
              }}
            />
            <Typography variant="body2">
              {item.name} ({item.value}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};