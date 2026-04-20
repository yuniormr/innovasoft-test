import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1F2937 0%, #0B1220 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 800,
          color: '#FDBA74',
          lineHeight: 1,
          mb: 1,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: '#fff',
          fontWeight: 700,
          mb: 1,
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        {t('errors.not_found_title')}
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontSize: '0.95rem' }}>
        {t('errors.not_found_desc')}
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<HomeRoundedIcon />}
        onClick={() => history.push(ROUTES.HOME)}
        sx={{
          bgcolor: '#92400E',
          color: '#fff',
          fontWeight: 700,
          '&:hover': { bgcolor: '#7C2D12' },
        }}
      >
        {t('errors.go_home')}
      </Button>
    </Box>
  );
}
