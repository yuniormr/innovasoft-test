import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { ROUTES } from '../../../utils/constants';
import { useAuth } from '../../../hooks/useAuth';

export default function HomePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useAuth();

  return (
    <MainLayout>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: 700,
          color: 'primary.main',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        {t('home.welcome')}, {user?.username.charAt(0).toUpperCase() + '' + user?.username.slice(1)}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('home.subtitle')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardActionArea onClick={() => history.push(ROUTES.CLIENTS)} sx={{ p: 0 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <PeopleRoundedIcon sx={{ color: '#fff', fontSize: '1.8rem' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  {t('nav.clients')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('home.clients_desc')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'tertiary.main' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t('home.go')}
                  </Typography>
                  <ArrowForwardRoundedIcon fontSize="small" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
