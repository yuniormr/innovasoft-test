import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { useAuth } from '../../hooks/useAuth';
import { useColorMode } from '../../theme/AppThemeProvider';
import { Box } from '@mui/material';

const LANGS = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

interface AppBarHeaderProps {
  onMenuClick: () => void;
}

export default function AppBarHeader({ onMenuClick }: AppBarHeaderProps) {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { mode, toggle } = useColorMode();
  const [langAnchor, setLangAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: { xs: '56px', sm: '64px' },
        }}
      >
        {/* Left: hamburger + brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={onMenuClick}
            sx={{ color: '#fff', display: { md: 'none' } }}
            aria-label="menu"
          >
            <MenuRoundedIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#FDBA74',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textTransform: 'uppercase',
            }}
          >
            Compañia <span style={{ color: 'rgba(255,255,255,0.9)' }}>Prueba</span>
          </Typography>
        </Box>

        {/* Right: language dropdown + theme toggle + logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

          {/* Language picker */}
          <Tooltip title={t('common.language')}>
            <IconButton
              onClick={(e) => setLangAnchor(e.currentTarget)}
              sx={{ color: 'rgba(255,255,255,0.85)' }}
              size="small"
            >
              <LanguageRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={() => setLangAnchor(null)}
            PaperProps={{ sx: { mt: 0.5 } }}
          >
            {LANGS.map(({ code, label }) => (
              <MenuItem
                key={code}
                selected={i18n.language.startsWith(code)}
                onClick={() => { i18n.changeLanguage(code); setLangAnchor(null); }}
                sx={{ fontSize: '0.875rem' }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>

          {/* Dark / light toggle */}
          <Tooltip title={mode === 'light' ? t('common.dark_mode') : t('common.light_mode')}>
            <IconButton onClick={toggle} sx={{ color: 'rgba(255,255,255,0.85)' }} size="small">
              {mode === 'light' ? (
                <DarkModeRoundedIcon fontSize="small" />
              ) : (
                <LightModeRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* Logout */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={logout}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.5)',
              fontSize: '0.75rem',
              px: 1.5,
              '&:hover': {
                borderColor: '#fff',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {t('auth.logout')}
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
}
