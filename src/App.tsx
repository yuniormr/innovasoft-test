import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppThemeProvider from './theme/AppThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { ClientProvider } from './context/ClientContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRouter from './router/AppRouter';
import Notification from './components/Notification';
import { queryClient } from './lib/queryClient';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './i18n/i18n';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <BrowserRouter>
          <NotificationProvider>
            <AuthProvider>
              <ClientProvider>
                <AppRouter />
                <Notification />
              </ClientProvider>
            </AuthProvider>
          </NotificationProvider>
        </BrowserRouter>
      </AppThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
