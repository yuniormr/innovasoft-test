import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

export const DRAWER_WIDTH = 240;

const navItems = [
  { key: 'home', labelKey: 'nav.home', icon: <HomeRoundedIcon />, path: ROUTES.HOME },
  { key: 'clients', labelKey: 'nav.clients', icon: <PeopleRoundedIcon />, path: ROUTES.CLIENTS },
];

interface DrawerContentProps {
  onClose?: () => void;
}

function DrawerContent({ onClose }: DrawerContentProps) {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { user } = useAuth();


  const handleNav = (path: string) => {
    history.push(path);
    onClose?.();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar spacer */}
      <Box sx={{ minHeight: { xs: '56px', sm: '64px' } }} />

      {/* User section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'rgba(0,0,0,0.2)',
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: '#FDBA74',
            color: '#431407',
            fontWeight: 700,
            fontSize: '1.4rem',
            mb: 1,
          }}
        >
          {user?.username?.[0]?.toUpperCase() ?? 'U'}
        </Avatar>
        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
          {user?.username.toUpperCase()}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1 }} />

      {/* Nav items */}
      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.key}
              onClick={() => handleNav(item.path)}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? '#FDBA74' : 'rgba(255,255,255,0.8)',
                '&.Mui-selected': {
                  bgcolor: 'rgba(253,186,116,0.15)',
                  color: '#FDBA74',
                  '& .MuiListItemIcon-root': { color: '#FDBA74' },
                  '&:hover': { bgcolor: 'rgba(253,186,116,0.25)' },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export interface SidebarMenuProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ mobileOpen, onClose }: SidebarMenuProps) {
  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <DrawerContent onClose={onClose} />
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </>
  );
}
