import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import { createLoginSchema } from '../../../schemas/authSchemas';
import type { LoginFormValues } from '../../../types';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
  initialUsername: string;
}

export default function LoginForm({ onSubmit, loading, initialUsername }: LoginFormProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: initialUsername || '',
      password: '',
      rememberMe: !!initialUsername,
    },
  });

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
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value ?? false}
                color="primary"
                size="small"
              />
            }
            label={<Typography variant="body2">{t('auth.remember_me')}</Typography>}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 1, py: 1.5, fontSize: '0.95rem' }}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : t('auth.login')}
      </Button>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="body2">
          {t('auth.no_account')}{' '}
          <Link
            to={ROUTES.REGISTER}
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            {t('auth.register')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
