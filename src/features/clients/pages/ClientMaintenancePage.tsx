import React, { Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MainLayout from '../../../components/layout/MainLayout';
import ClientForm from '../components/ClientForm';
import { clientService } from '../../../api/clientService';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import { ROUTES } from '../../../utils/constants';
import type { Client, ClientFormValues } from '../../../types';

function formatDateForInput(dateStr: string | undefined): string {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
}

function mapApiToForm(data: Client): ClientFormValues {
  return {
    nombre: data.nombre || '',
    apellidos: data.apellidos || '',
    identificacion: data.identificacion || '',
    celular: data.celular || data.telefonoCelular || '',
    otroTelefono: data.otroTelefono || '',
    direccion: data.direccion || '',
    fNacimiento: formatDateForInput(data.fNacimiento),
    fAfiliacion: formatDateForInput(data.fAfiliacion),
    sexo: data.sexo || '',
    resenaPersonal: data.resenaPersonal || data.resennaPersonal || '',
    imagen: data.imagen || '',
    interesFK: data.interesesId || data.interesFK || '',
  };
}

interface MaintenanceFormProps {
  id: string | undefined;
  isEdit: boolean;
  onSubmit: (values: ClientFormValues) => void;
  onBack: () => void;
  loading: boolean;
}

function ClientMaintenanceForm({ id, isEdit, onSubmit, onBack, loading }: MaintenanceFormProps) {
  const { t } = useTranslation();
  const history = useHistory();
  const { showError } = useNotification();

  const { data: clientData } = useQuery(
    ['client', id],
    () => clientService.getById(id as string),
    {
      enabled: isEdit,
      suspense: true,
      onError: () => {
        showError(t('common.error_generic'));
        history.push(ROUTES.CLIENTS);
      },
    },
  );

  const initialValues = clientData ? mapApiToForm(clientData) : null;

  return (
    <ClientForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      onBack={onBack}
      loading={loading}
    />
  );
}

export default function ClientMaintenancePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const qc = useQueryClient();

  const isEdit = !!id;

  const { mutate: save, isLoading: saving } = useMutation(
    (values: ClientFormValues) =>
      isEdit
        ? clientService.update({
          id,
          nombre: values.nombre,
          apellidos: values.apellidos,
          identificacion: values.identificacion,
          celular: values.celular,
          otroTelefono: values.otroTelefono,
          direccion: values.direccion,
          fNacimiento: values.fNacimiento,
          fAfiliacion: values.fAfiliacion,
          sexo: values.sexo,
          resennaPersonal: values.resenaPersonal,
          imagen: values.imagen,
          interesFK: values.interesFK,
          usuarioId: user?.id,
        })
        : clientService.create({
          nombre: values.nombre,
          apellidos: values.apellidos,
          identificacion: values.identificacion,
          celular: values.celular,
          otroTelefono: values.otroTelefono,
          direccion: values.direccion,
          fNacimiento: values.fNacimiento,
          fAfiliacion: values.fAfiliacion,
          sexo: values.sexo,
          resennaPersonal: values.resenaPersonal,
          imagen: values.imagen,
          interesFK: values.interesFK,
          usuarioId: user?.id,
        }),
    {
      onSuccess: () => {
        qc.invalidateQueries(['clients']);
        if (isEdit) qc.invalidateQueries(['client', id]);
        showSuccess(isEdit ? t('common.success_update') : t('common.success_create'));
        history.push(ROUTES.CLIENTS);
      },
      onError: () => {
        showError(t('common.error_generic'));
      },
    },
  );

  return (
    <MainLayout>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.3rem', sm: '1.6rem' }, mb: 3 }}
      >
        {t('clients.maintenance_title')}
      </Typography>

      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        }
      >
        <ClientMaintenanceForm
          id={id}
          isEdit={isEdit}
          onSubmit={save}
          onBack={() => history.push(ROUTES.CLIENTS)}
          loading={saving}
        />
      </Suspense>
    </MainLayout>
  );
}
