import React, { useMemo, useEffect, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import ClientImageUpload from './ClientImageUpload';
import { interestsService } from '../../../api/interestsService';
import { GENDER } from '../../../utils/constants';
import { createClientSchema } from '../../../schemas/clientSchemas';
import type { ClientFormValues } from '../../../types';

interface ClientFormProps {
  initialValues?: ClientFormValues | null;
  onSubmit: (values: ClientFormValues) => void;
  onBack: () => void;
  loading: boolean;
}

export default function ClientForm({ initialValues, onSubmit, onBack, loading }: ClientFormProps) {
  const { t } = useTranslation();

  const schema = useMemo(() => createClientSchema(t), [t]);

  const { data: interests = [] } = useQuery(
    ['interests'],
    () => interestsService.getAll(),
    { staleTime: 1000 * 60 * 10, suspense: true },
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues ?? {
      nombre: '',
      apellidos: '',
      identificacion: '',
      celular: '',
      otroTelefono: '',
      direccion: '',
      fNacimiento: '',
      fAfiliacion: '',
      sexo: '',
      resenaPersonal: '',
      imagen: '',
      interesFK: '',
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const req = (label: string): React.ReactElement => (
    <>
      {label}{' '}
      <Box component="span" sx={{ color: 'error.main' }}>
        *
      </Box>
    </>
  );

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        {/* Avatar column */}
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 1, sm: 0 } }}>
            <Controller
              name="imagen"
              control={control}
              render={({ field }) => (
                <ClientImageUpload
                  value={field.value || null}
                  onChange={(base64) => field.onChange(base64 ?? '')}
                />
              )}
            />
          </Box>
        </Grid>

        {/* Fields column */}
        <Grid item xs={12} sm={9} md={10}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.name'))}
                {...register('nombre')}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                fullWidth
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.lastname'))}
                {...register('apellidos')}
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
                fullWidth
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.id_number'))}
                {...register('identificacion')}
                error={!!errors.identificacion}
                helperText={errors.identificacion?.message}
                fullWidth
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.mobile'))}
                {...register('celular')}
                error={!!errors.celular}
                helperText={errors.celular?.message}
                fullWidth
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('clients.fields.other_phone')}
                {...register('otroTelefono')}
                error={!!errors.otroTelefono}
                helperText={errors.otroTelefono?.message}
                fullWidth
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="sexo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={req(t('clients.fields.gender'))}
                    error={!!errors.sexo}
                    helperText={errors.sexo?.message}
                    fullWidth
                    select
                  >
                    <MenuItem value={GENDER.MALE}>{t('clients.fields.gender_male')}</MenuItem>
                    <MenuItem value={GENDER.FEMALE}>{t('clients.fields.gender_female')}</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={req(t('clients.fields.address'))}
                {...register('direccion')}
                error={!!errors.direccion}
                helperText={errors.direccion?.message}
                fullWidth
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.birth_date'))}
                type="date"
                {...register('fNacimiento')}
                error={!!errors.fNacimiento}
                helperText={errors.fNacimiento?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={req(t('clients.fields.affiliation_date'))}
                type="date"
                {...register('fAfiliacion')}
                error={!!errors.fAfiliacion}
                helperText={errors.fAfiliacion?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="interesFK"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={req(t('clients.fields.interests'))}
                    error={!!errors.interesFK}
                    helperText={errors.interesFK?.message}
                    fullWidth
                    select
                  >
                    {interests.map((i) => (
                      <MenuItem key={i.id} value={i.id}>
                        {i.descripcion}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={req(t('clients.fields.bio'))}
                {...register('resenaPersonal')}
                error={!!errors.resenaPersonal}
                helperText={errors.resenaPersonal?.message}
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: { sm: 140 } }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : t('common.save')}
        </Button>
        <Button variant="outlined" onClick={onBack} sx={{ minWidth: { sm: 120 } }}>
          {t('common.cancel')}
        </Button>
      </Box>
    </Box>
  );
}
