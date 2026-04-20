import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { authService } from '../../../api/authService';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import { ROUTES } from '../../../utils/constants';
import type { RegisterFormValues } from '../../../types';
import { useMutation } from '@tanstack/react-query';

export default function RegisterPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();

  const { mutate: register, isLoading: loading } = useMutation(
    (values: RegisterFormValues) =>
      authService.register(values.username, values.email, values.password),
    {
      onSuccess: () => {
        showSuccess(t('auth.register_success'));
        history.push(ROUTES.LOGIN);
      },
      onError: () => {
        showError(t('auth.register_error'));
      },
    },
  );

  useEffect(() => {
    if (isAuthenticated) history.replace(ROUTES.HOME);
  }, [isAuthenticated, history]);

  const handleSubmit = (values: RegisterFormValues): void => {
    register(values);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1F2937 0%, #111827 50%, #0B1220 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420, borderRadius: 4, boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>
                c
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              cl<span style={{ color: '#92400E' }}>a</span>ss{' '}
              <Typography component="span" variant="h6" sx={{ fontWeight: 400, color: 'text.secondary' }}>
                SOFTWARE
              </Typography>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', mb: 3, color: 'primary.main' }}>
            {t('auth.register_title')}
          </Typography>

          <RegisterForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>
    </Box>
  );
}
