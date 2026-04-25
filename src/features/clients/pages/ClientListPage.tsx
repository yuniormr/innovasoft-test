import React, { useState, Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MainLayout from '../../../components/layout/MainLayout';
import ClientTable from '../components/ClientTable';
import ClientFilters from '../components/ClientFilters';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { useClients } from '../../../hooks/useClients';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import { clientService } from '../../../api/clientService';
import { ROUTES } from '../../../utils/constants';
import type { Client, ClientFilters as ClientFiltersType } from '../../../types';

interface TableContentProps {
  filters: ClientFiltersType;
  userId: number | undefined;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (client: Client) => void;
}

function ClientTableContent({ filters, userId, onView, onEdit, onDelete }: TableContentProps) {
  const { t } = useTranslation();
  const { showError } = useNotification();

  const { data: clients = [] } = useQuery(
    ['clients', filters, userId],
    () => clientService.list({ ...filters, usuarioId: userId }),
    {
      enabled: !!userId,
      keepPreviousData: true,
      suspense: true,
      useErrorBoundary: false,
      onError: () => {
        showError(t('common.error_generic'));
      },
    },
  );

  return <ClientTable clients={clients} onView={onView} onEdit={onEdit} onDelete={onDelete} />;
}

export default function ClientListPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useAuth();
  const { filters, setClientFilter } = useClients();
  const { showSuccess, showError } = useNotification();
  const qc = useQueryClient();

  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);

  const { mutate: deleteClient, isLoading: deleteLoading } = useMutation(
    (id: number) => clientService.remove(id),
    {
      onSuccess: () => {
        qc.invalidateQueries(['clients']);
        showSuccess(t('common.success_delete'));
        setDeleteTarget(null);
      },
      onError: () => {
        showError(t('common.error_generic'));
      },
    },
  );

  const handleSearch = (f: { identificacion: string; nombre: string }) => {
    setClientFilter(f);
  };

  const handleClear = () => {
    setClientFilter({ identificacion: '', nombre: '' });
  };

  const handleView = (id: number) => history.push(`/clients/${id}`);
  const handleEdit = (id: number) => history.push(`/clients/${id}/edit`);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.3rem', sm: '1.6rem' } }}
          >
            {t('clients.title')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => history.push(ROUTES.HOME)}
              size="small"
            >
              {t('common.back')}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => history.push(ROUTES.CLIENT_NEW)}
              size="small"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {t('clients.new_client')}
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <ClientFilters
          onSearch={handleSearch}
          onClear={handleClear}
          loading={false}
          filters={filters as { identificacion: string; nombre: string }}
        />

        {/* Table — ocupa el espacio restante */}
        <Box sx={{ flex: 1, minHeight: 0, mt: 1 }}>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            }
          >
            <ClientTableContent
              filters={filters}
              userId={user?.id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          </Suspense>
        </Box>
      </Box>

      <DeleteConfirmDialog
        open={!!deleteTarget}
        clientName={deleteTarget ? `${deleteTarget.nombre} ${deleteTarget.apellidos}` : ''}
        loading={deleteLoading}
        onConfirm={() => deleteClient(deleteTarget!.id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </MainLayout>
  );
}
