import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import { createRegisterSchema } from '../../../schemas/authSchemas';
import type { RegisterFormValues } from '../../../types';
import type { ServerFieldErrors } from '../../../utils/apiErrors';

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  loading: boolean;
  serverErrors?: ServerFieldErrors | null;
}

export default function RegisterForm({ onSubmit, loading, serverErrors }: RegisterFormProps) {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: '', email: '', password: '' },
  });

  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([field, key]) => {
        const message = i18n.exists(key) ? t(key) : t('common.error_generic');
        setError(field as keyof RegisterFormValues, { type: 'server', message });
      });
    }
  }, [serverErrors, setError, t, i18n]);

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        label={t('auth.username')}
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label={t('auth.email')}
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label={t('auth.password')}
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 1, py: 1.5, fontSize: '0.95rem' }}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : t('auth.register')}
      </Button>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="body2">
          {t('auth.have_account')}{' '}
          <Link
            to={ROUTES.LOGIN}
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            {t('auth.login')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
