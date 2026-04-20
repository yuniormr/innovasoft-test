import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBarHeader from './AppBarHeader';
import SidebarMenu from './SidebarMenu';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBarHeader onMenuClick={() => setMobileOpen(true)} />
      <SidebarMenu mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          width: '100%',
          overflow: 'auto',
          minHeight: 0,
          mt: { xs: 2, sm: 2 }, // Account for AppBar height
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
