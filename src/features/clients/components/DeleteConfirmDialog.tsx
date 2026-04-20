import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmDialogProps {
  open: boolean;
  clientName: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ open, clientName, loading, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningRoundedIcon sx={{ color: 'error.main' }} />
          {t('clients.delete_confirm_title')}
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('clients.delete_confirm_msg', { name: clientName })}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onCancel} sx={{ color: 'text.secondary' }}>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: '#B71C1C' } }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : t('common.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
