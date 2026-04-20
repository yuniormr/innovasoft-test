import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useTranslation } from 'react-i18next';
import type { Client } from '../../../types';

interface ClientTableProps {
  clients: Client[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (client: Client) => void;
}

export default function ClientTable({ clients, onView, onEdit, onDelete }: ClientTableProps) {
  const { t } = useTranslation();

  if (clients.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
        <Typography variant="body1">{t('clients.no_results')}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ height: '100%', overflow: 'auto', borderRadius: 2 }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{t('clients.col_id')}</TableCell>
            <TableCell>{t('clients.col_name')}</TableCell>
            <TableCell align="center">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} hover>
              <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                {client.identificacion}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, py: { xs: 1, sm: 1.5 } }}>
                {client.nombre} {client.apellidos}
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 150 }}>
                <Tooltip title={t('common.view_detail')}>
                  <IconButton size="small" onClick={() => onView(client.id)} sx={{ color: 'primary.main' }}>
                    <VisibilityRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common.edit')}>
                  <IconButton size="small" onClick={() => onEdit(client.id)} sx={{ color: 'secondary.main' }}>
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common.delete')}>
                  <IconButton size="small" onClick={() => onDelete(client)} sx={{ color: 'error.main' }}>
                    <DeleteRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
