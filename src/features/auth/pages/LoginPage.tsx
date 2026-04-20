import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import { storage } from '../../../utils/storage';
import { ROUTES } from '../../../utils/constants';
import type { LoginFormValues } from '../../../types';

export default function LoginPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { login, loading, isAuthenticated } = useAuth();
  const { showError } = useNotification();

  useEffect(() => {
    if (isAuthenticated) history.replace(ROUTES.HOME);
  }, [isAuthenticated, history]);

  const rememberedUsername = storage.getRememberedUsername();

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    const success = await login(values.username, values.password, values.rememberMe);
    if (success) {
      history.replace(ROUTES.HOME);
    } else {
      showError(t('auth.invalid_credentials'));
    }
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
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            {/* Brand */}
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
            {t('auth.login_title')}
          </Typography>

          <LoginForm
            onSubmit={handleSubmit}
            loading={loading}
            initialUsername={rememberedUsername || ''}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
