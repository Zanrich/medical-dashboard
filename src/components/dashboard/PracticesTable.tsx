import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Practice } from '@/types';

interface PracticesTableProps {
  practices: Practice[];
  onEdit: (practice: Practice) => void;
  onDelete: (practice: Practice) => void;
}

export const PracticesTable: React.FC<PracticesTableProps> = ({
  practices,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Practice Name</TableCell>
            <TableCell>Tel No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {practices.map((practice) => (
            <TableRow key={practice.id}>
              <TableCell>{practice.name}</TableCell>
              <TableCell>{practice.telephone}</TableCell>
              <TableCell>{practice.email}</TableCell>
              <TableCell>{practice.dateCreated}</TableCell>
              <TableCell>
                <Chip
                  label={practice.status}
                  color={practice.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(practice)} size="small">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(practice)} size="small">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};