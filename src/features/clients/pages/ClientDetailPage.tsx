import React, { Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../../../components/layout/MainLayout';
import { clientService } from '../../../api/clientService';
import { interestsService } from '../../../api/interestsService';
import { useNotification } from '../../../hooks/useNotification';
import { ROUTES, GENDER } from '../../../utils/constants';

interface DetailFieldProps {
    label: string;
    value?: string | null;
}

function DetailField({ label, value }: DetailFieldProps) {
    return (
        <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.25, color: value ? 'text.primary' : 'text.disabled' }}>
                {value || '—'}
            </Typography>
        </Box>
    );
}

function ClientDetailContent() {
    const { t } = useTranslation();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { showError } = useNotification();

    const { data: client } = useQuery(
        ['client', id],
        () => clientService.getById(id),
        {
            suspense: true,
            onError: () => {
                showError(t('common.error_generic'));
                history.push(ROUTES.CLIENTS);
            },
        },
    );

    const { data: interests = [] } = useQuery(
        ['interests'],
        () => interestsService.getAll(),
        { staleTime: 1000 * 60 * 10, suspense: true },
    );

    const interestId = client!.interesesId ?? client!.interesFK;
    const interestLabel = interests.find((i) => String(i.id) === String(interestId))?.descripcion;

    // client is guaranteed to be defined — suspense ensures it
    const genderLabel =
        client!.sexo === GENDER.MALE
            ? t('clients.fields.gender_male')
            : client!.sexo === GENDER.FEMALE
                ? t('clients.fields.gender_female')
                : client!.sexo || '—';

    return (
        <>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.3rem', sm: '1.6rem' } }}
                >
                    {t('common.view_detail')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackRoundedIcon />}
                        onClick={() => history.push(ROUTES.CLIENTS)}
                        size="small"
                    >
                        {t('common.back')}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditRoundedIcon />}
                        onClick={() => history.push(`/clients/${id}/edit`)}
                        size="small"
                    >
                        {t('common.edit')}
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ borderRadius: 3, p: { xs: 2, sm: 3 } }}>
                {/* Avatar + nombre */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Avatar
                        src={client!.imagen || undefined}
                        sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                    >
                        {!client!.imagen && <PersonRoundedIcon sx={{ fontSize: 40 }} />}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {client!.nombre} {client!.apellidos}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {client!.identificacion}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Contacto */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                            {t('clients.fields.mobile')} &amp; {t('clients.fields.other_phone')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DetailField label={t('clients.fields.mobile')} value={client!.celular || client!.telefonoCelular} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DetailField label={t('clients.fields.other_phone')} value={client!.otroTelefono} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DetailField label={t('clients.fields.address')} value={client!.direccion} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* Datos personales */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                            {t('clients.fields.bio')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DetailField label={t('clients.fields.birth_date')} value={client!.fNacimiento?.split('T')[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DetailField label={t('clients.fields.affiliation_date')} value={client!.fAfiliacion?.split('T')[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DetailField label={t('clients.fields.gender')} value={genderLabel} />
                    </Grid>
                    <Grid item xs={12}>
                        <DetailField label={t('clients.fields.bio')} value={client!.resenaPersonal || client!.resennaPersonal} />
                    </Grid>

                    {/* Intereses */}
                    {interestLabel && (
                        <Grid item xs={12}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {t('clients.fields.interests')}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <Chip label={interestLabel} size="small" variant="outlined" />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    );
}

export default function ClientDetailPage() {
    return (
        <MainLayout>
            <Suspense
                fallback={
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                }
            >
                <ClientDetailContent />
            </Suspense>
        </MainLayout>
    );
}
